//
//  widget.swift
//  widget
//
//  Created by Kuck, Robin on 09.01.24.
//  Copyright © 2024 NativeScript. All rights reserved.
//

import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), salesOrdersCount: "-")
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), salesOrdersCount: "-")
        completion(entry)
    }
    
    private func getGroupId() -> String {
        var result: String = ""
        if let bundleIdentifier = Bundle.main.bundleIdentifier {
            let splittedBundleIdentifier = bundleIdentifier.split(separator: ".widget")[0]
            result = "group." + splittedBundleIdentifier
        }
        return result
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let salesOrdersCount = UserDefaults(suiteName: getGroupId())!.string(forKey: "salesOrdersCount")
        let currentDate = Date()
        let entry = SimpleEntry(date: currentDate, salesOrdersCount: salesOrdersCount ?? "-")
        
        // Create a date that's 30 minutes in the future.
        let nextUpdateDate = Calendar.current.date(byAdding: .minute, value: 30, to: currentDate)!
        
        // Create a timeline with the entry and reload policy with the date for next update.
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdateDate))
        
        // Call completion handler to pass the timeline to WidgetKit.
        completion(timeline)
    }
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
            Text("Sales Orders").fontWeight(.black)
            Text("Time: \(entry.date, style: .time)")
        }
    }
}

struct widget: Widget {
    let kind: String = "widget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            if #available(iOS 17.0, *) {
                widgetEntryView(entry: entry)
                    .containerBackground(.fill.tertiary, for: .widget)
            } else {
                widgetEntryView(entry: entry)
                    .padding()
                    .background()
            }
        }
        .configurationDisplayName("Sales Orders Widget")
        .description("This is an example widget to show the count of Sales Orders.")
    }
}

/*
#Preview(as: .systemSmall) {
    widget()
} timeline: {
    SimpleEntry(date: .now, salesOrdersCount: "-")
    SimpleEntry(date: .now, salesOrdersCount: "105")
}
*/
