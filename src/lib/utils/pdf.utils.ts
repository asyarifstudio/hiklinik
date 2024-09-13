import * as pdfMake from 'pdfmake/build/pdfmake';
import type { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';


const fonts:TFontDictionary = {
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    }
}

export const PdfUtils = {
    
    generate:async (docDefinition:TDocumentDefinitions):Promise<void>=>{
        pdfMake.createPdf(docDefinition,undefined,fonts).open({}, window);
    },

    download:async (docDefinition:TDocumentDefinitions):Promise<void>=>{
        pdfMake.createPdf(docDefinition,undefined,fonts).download()
    }
    
}