let fs = require('tns-core-modules/file-system');
import { imageToPath } from './FileUtils/ImageToPath';
export default function DocumentFileSave(pageProxy) {
  console.log("In saving media");
  const binding = pageProxy.getActionBinding();
  let readLink = binding['@odata.readLink'];
  //var filename = binding.ProductId+".jpg";
  //var filename = bindingObject.FileName;
  //const filename = `${binding["ProductId"]}.png`;
  if (readLink) {
    //var tempDir = fs.knownFolders.temp();
    //var attachmentPath = fs.path.join(tempDir.path, filename);
    const attachmentPath = imageToPath(binding, 'ProductId', 'ProductImagesForOpenDoc');
    var attachmentFile = fs.File.fromPath(attachmentPath);
    console.log("SAVE AT: " + attachmentPath);
    //alert(pageProxy.getActionResult("DownloadImageRes").data);
    attachmentFile.writeSync(pageProxy.getActionResult("DownloadImageRes").data, err => {
      attachmentFile.remove();
      alert("WRITE SYNC FAILED: " + err)
    });

    let pressedItem = pageProxy.getPressedItem();
    let sectionedTableProxy = pageProxy.getControls()[0];
    let section = sectionedTableProxy.getSections()[0];
    section.setIndicatorState("open", pressedItem);
  }
}