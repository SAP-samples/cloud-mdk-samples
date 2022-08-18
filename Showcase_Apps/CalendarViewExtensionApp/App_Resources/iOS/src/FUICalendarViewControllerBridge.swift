//
//  FUICalendarViewBridge.swift
//  CalendarControl
//
//  Created by Kuck, Robin on 11.08.22.
//  Copyright © 2022 NativeScript. All rights reserved.
//

import Foundation
import SAPFiori

@objc(FUICalendarViewControllerBridge)
public class FUICalendarViewControllerBridge: UIViewController, FUICalendarViewDelegate {
    
    @objc public var onDateSelectCallback: ((Date?) -> Void)? = nil
    
    private var calendarView: FUICalendarView = FUICalendarView()
    
    public override func viewDidLoad() {
        super.viewDidLoad()
        
        calendarView.delegate = self
        calendarView.frame = self.view.frame
        self.view = calendarView
    }
    
    /// Handle updates to the UISize at runtime
    ///
    /// - Parameters:
    ///   - size: size of the view at the end of animation
    ///   - coordinator: animation coodinator handling changes to UI
    override open func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        super.viewWillTransition(to: size, with: coordinator)
        // Update the frame size
        self.calendarView.frame.size = size
    }
    
    public func calendarView(_ calendarView: FUICalendarView, didChangeSelections selections: [FUIDateSelection]) {
        
    }
    
    public func calendarView(_ calendarView: FUICalendarView, didChangeVisibleDatesTo visibleDates: FUIVisibleDates) {
        self.onDateSelectCallback?(self.calendarView.selectedDates?[0] ?? nil)
    }
    
    public func calendarView(_ calendarView: FUICalendarView, didSelectDate date: Date, cell: FUICalendarItemCollectionViewCell) {
        self.onDateSelectCallback?(date)
    }
    
}
