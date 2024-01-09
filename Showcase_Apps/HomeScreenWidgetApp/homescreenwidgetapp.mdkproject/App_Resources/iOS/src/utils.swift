import Foundation
import WidgetKit

@objcMembers
@objc(WidgetHelper)
public class WidgetHelper: NSObject {
    
    public static func refreshWidgetData(){
        if #available(iOS 14.0, *) {
            Task.detached(priority: .userInitiated) {
                WidgetCenter.shared.reloadAllTimelines()
            }
        }
    }

}