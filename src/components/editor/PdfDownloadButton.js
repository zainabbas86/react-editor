import React, {Component} from 'react';
import logo from '../../adobe-pdf-icon.svg';
import '../../resources/css/MyEditor.css';
import html2pdf from 'html2pdf-jspdf2';

class PdfDownloadButton extends Component {
    onClick = () => html2pdf(document.getElementById('content'));

    render() {
        return (
            <div className="pdfDownloadButtonWrapper">
                <button onClick={this.onClick} className="pdfDownloadButton" title="Download PDF">
                    <img src={logo} className="Pdf-logo" alt="logo"/>
                </button>
            </div>
        );
    }
}

export default PdfDownloadButton;