import React from 'react';
import Collapsible from 'react-collapsible';

const SupportedOperations = () => (
    <article>
                <h1>Convert Image Files</h1>

                <Collapsible trigger="Supported operations:">
                    <h2>
                        PNG to JPEG
                    </h2>
                    <h2>
                        JPEG to PNG
                    </h2>
                    <h2>
                        PNG to BMP
                    </h2>
                    <h2>
                        JPEG to BMP
                    </h2>
                    <h2>
                        BMP to PNG
                    </h2>
                    <h2>
                        BMP to JPEG
                    </h2>
                    <h2>
                        Image Quality
                    </h2>
                    <h2>
                        Greyscale
                    </h2>
                    <h2>
                        Fixed size
                    </h2>
                    <h2>
                        Scale
                    </h2>
                    <h2>
                        Scale to Width and/or Height
                    </h2>
                    <h2>
                        Flip Horizontal
                    </h2>
                    <h2>
                        Flip Vertical
                    </h2>
                    <h2>
                        Rotate
                    </h2>
                </Collapsible>
                
                

            </article>
)

export default SupportedOperations;