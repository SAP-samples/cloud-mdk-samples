import GetDetailImage from './GetDetailImage';

export default async function GetImageCellImage(context) {
	// For Image Collection showcase, we store the images in different folders
	return GetDetailImage(context, 'ProductImageForImageCells');
}