//
//  widget.swift
//  widget
//
//  Created by Kuck, Robin on 09.01.24.
//  Copyright © 2024 NativeScript. All rights reserved.
//

import WidgetKit
import SwiftUI
import AppIntents

struct Provider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> SalesOrderHeaderEntry {
        SalesOrderHeaderEntry(date: Date(), salesOrdersCount: "-", salesOrderStatus: .new)
    }
    
    func snapshot(for configuration: SelectSalesOrderHeaderIntent, in context: Context) async -> SalesOrderHeaderEntry {
        SalesOrderHeaderEntry(date: Date(), salesOrdersCount: "-", salesOrderStatus: configuration.salesOrderStatus)
    }
    
    private func getGroupId() -> String {
        var result: String = ""
        if let bundleIdentifier = Bundle.main.bundleIdentifier {
            let separator = ".widget"
            result = "group." + bundleIdentifier.components(separatedBy: separator).dropLast().joined(separator: separator)
        }
        return result
    }
    
    func timeline(for configuration: SelectSalesOrderHeaderIntent, in context: Context) async -> Timeline<SalesOrderHeaderEntry> {
        let salesOrdersCountDictionary = UserDefaults(suiteName: getGroupId())!.dictionary(forKey: "salesOrdersCount")
        let salesOrdersCount: String = salesOrdersCountDictionary?[configuration.salesOrderStatus.rawValue] as? String ?? "-"
        let entry = SalesOrderHeaderEntry(date: Date(), salesOrdersCount: salesOrdersCount, salesOrderStatus: configuration.salesOrderStatus)
        
        // Create a date that's 30 minutes in the future.
        let currentDate = Date()
        let nextUpdateDate = Calendar.current.date(byAdding: .minute, value: 30, to: currentDate)!
        
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdateDate))
        
        return timeline
    }
}

struct SalesOrderHeaderEntry: TimelineEntry {
    let date: Date
    let salesOrdersCount: String
    let salesOrderStatus: SalesOrderHeaderStatus
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let salesOrdersCount: String
}

struct widgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        VStack {
            Text(entry.salesOrdersCount).fontWeight(.black).font(.largeTitle)
            switch entry.salesOrderStatus {
            case .new:
                Text("New").fontWeight(.black)
            case .accepted:
                Text("Accepted").fontWeight(.black)
            case .rejected:
                Text("Rejected").fontWeight(.black)
            }
            Text("Sales Orders").fontWeight(.black)
            Text("Time: \(entry.date, style: .time)")
        }
        // Change `homescreenwidgetapp` to your custom UrlScheme defined in MDKProject.json
        .widgetURL(URL(string: "homescreenwidgetapp://widgetdemo/salesorders?status=\(entry.salesOrderStatus.rawValue)"))
    }
}

struct widget: Widget {
    let kind: String = "widget"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, intent: SelectSalesOrderHeaderIntent.self, provider: Provider()) { entry in
            widgetEntryView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget)
        }
        .configurationDisplayName("Sales Orders Widget")
        .description("This is an example widget to show the count of Sales Orders.")
    }
}

struct SelectSalesOrderHeaderIntent: WidgetConfigurationIntent {
    static var title: LocalizedStringResource = "Select Sales Order Status"
    
    @Parameter(title: "Sales Order Status")
    var salesOrderStatus: SalesOrderHeaderStatus
    
    init(salesOrderStatus: SalesOrderHeaderStatus) {
        self.salesOrderStatus = salesOrderStatus
    }
    
    init() {
    }
}

enum SalesOrderHeaderStatus: String, AppEnum {
    typealias RawValue = String
    
    static var typeDisplayRepresentation: TypeDisplayRepresentation = TypeDisplayRepresentation(name: LocalizedStringResource("Status"))
    
    static var caseDisplayRepresentations: [SalesOrderHeaderStatus : DisplayRepresentation] = [
        .new: "New",
        .accepted: "Accepted",
        .rejected: "Rejected"
    ]
    
    case new = "New"
    case accepted = "Accepted"
    case rejected = "Rejected"
}

#Preview(as: .systemSmall) {
    widget()
} timeline: {
    SalesOrderHeaderEntry(date: .now, salesOrdersCount: "0", salesOrderStatus: .new)
    SalesOrderHeaderEntry(date: .now, salesOrdersCount: "105", salesOrderStatus: .accepted)
    SalesOrderHeaderEntry(date: .now, salesOrdersCount: "85", salesOrderStatus: .rejected)
}
