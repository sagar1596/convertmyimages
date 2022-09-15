import React from 'react';
import Collapsible from 'react-collapsible';

const SupportedOperations = () => (
    <article itemScope itemType="https://schema.org/Help">
                <h1 itemProp="heading">Convert Image Files</h1>

                <Collapsible trigger="Supported operations:">
                    <h2 itemProp="pngToJpeg">
                        PNG to JPEG
                    </h2>
                    <h2 itemProp="jpegToPng"> 
                        JPEG to PNG
                    </h2>
                    <h2 itemProp='pngToBmp'>
                        PNG to BMP
                    </h2>
                    <h2 itemProp='jpegToBmp'>
                        JPEG to BMP
                    </h2>
                    <h2 itemProp='bmpToPng'>
                        BMP to PNG
                    </h2>
                    <h2 itemProp='bmpToJpeg'>
                        BMP to JPEG
                    </h2>
                    <h2 itemProp='quality'>
                        Image Quality
                    </h2>
                    <h2 itemProp='greyscale'>
                        Greyscale
                    </h2>
                    <h2 itemProp='fixedSize'>
                        Fixed size
                    </h2>
                    <h2 itemProp='scale'>
                        Scale
                    </h2>
                    <h2 itemProp='scaleToSize'>
                        Scale to Width and/or Height
                    </h2>
                    <h2 itemProp='flipHorizontal'>
                        Flip Horizontal
                    </h2>
                    <h2 itemProp='flipVertical'>
                        Flip Vertical
                    </h2>
                    <h2 itemProp='rotate'>
                        Rotate
                    </h2>
                </Collapsible>
                
                

            </article>
)

export default SupportedOperations;