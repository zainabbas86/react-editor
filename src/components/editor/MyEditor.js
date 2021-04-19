import React, {Component} from 'react';
import '../../resources/css/MyEditor.css';
import {EditorState, RichUtils, ContentState, convertFromHTML} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin, { Separator,} from '@draft-js-plugins/static-toolbar';
import editorStyles from '../../resources/css/MyEditor.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from '@draft-js-plugins/buttons';
import HeadlinesButton from './HeadlineButton';
import PdfDownloadButton from './PdfDownloadButton';
import { convertToHTML } from 'draft-convert';

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

class MyEditor extends React.Component {

    constructor(props) {
        let htmlData = "\n" +
            "<head>\n" +
            "    <style>\n" +
            "        <!--\n" +
            "        /* Font Definitions */\n" +
            "        @font-face\n" +
            "        {font-family:\"Cambria Math\";\n" +
            "            panose-1:2 4 5 3 5 4 6 3 2 4;}\n" +
            "        @font-face\n" +
            "        {font-family:Calibri;\n" +
            "            panose-1:2 15 5 2 2 2 4 3 2 4;}\n" +
            "        @font-face\n" +
            "        {font-family:Cambria;\n" +
            "            panose-1:2 4 5 3 5 4 6 3 2 4;}\n" +
            "        @font-face\n" +
            "        {font-family:Consolas;\n" +
            "            panose-1:2 11 6 9 2 2 4 3 2 4;}\n" +
            "        /* Style Definitions */\n" +
            "        p.MsoNormal, li.MsoNormal, div.MsoNormal\n" +
            "        {margin-top:0cm;\n" +
            "            margin-right:0cm;\n" +
            "            margin-bottom:10.0pt;\n" +
            "            margin-left:0cm;\n" +
            "            font-size:12.0pt;\n" +
            "            font-family:\"Cambria\",serif;}\n" +
            "        h1\n" +
            "        {margin-top:24.0pt;\n" +
            "            margin-right:0cm;\n" +
            "            margin-bottom:0cm;\n" +
            "            margin-left:0cm;\n" +
            "            margin-bottom:.0001pt;\n" +
            "            page-break-after:avoid;\n" +
            "            font-size:16.0pt;\n" +
            "            font-family:\"Calibri\",sans-serif;\n" +
            "            color:#345A8A;}\n" +
            "        p.MsoHeader, li.MsoHeader, div.MsoHeader\n" +
            "        {mso-style-link:\"Header Char\";\n" +
            "            margin:0cm;\n" +
            "            margin-bottom:.0001pt;\n" +
            "            font-size:12.0pt;\n" +
            "            font-family:\"Cambria\",serif;}\n" +
            "        p.MsoFooter, li.MsoFooter, div.MsoFooter\n" +
            "        {mso-style-link:\"Footer Char\";\n" +
            "            margin:0cm;\n" +
            "            margin-bottom:.0001pt;\n" +
            "            font-size:12.0pt;\n" +
            "            font-family:\"Cambria\",serif;}\n" +
            "        p.MsoTitle, li.MsoTitle, div.MsoTitle\n" +
            "        {margin-top:24.0pt;\n" +
            "            margin-right:0cm;\n" +
            "            margin-bottom:12.0pt;\n" +
            "            margin-left:0cm;\n" +
            "            text-align:center;\n" +
            "            page-break-after:avoid;\n" +
            "            font-size:18.0pt;\n" +
            "            font-family:\"Calibri\",sans-serif;\n" +
            "            color:#345A8A;\n" +
            "            font-weight:bold;}\n" +
            "        p.MsoBodyText, li.MsoBodyText, div.MsoBodyText\n" +
            "        {margin-top:9.0pt;\n" +
            "            margin-right:0cm;\n" +
            "            margin-bottom:9.0pt;\n" +
            "            margin-left:0cm;\n" +
            "            font-size:12.0pt;\n" +
            "            font-family:\"Cambria\",serif;}\n" +
            "        p.Compact, li.Compact, div.Compact\n" +
            "        {mso-style-name:Compact;\n" +
            "            margin-top:1.8pt;\n" +
            "            margin-right:0cm;\n" +
            "            margin-bottom:1.8pt;\n" +
            "            margin-left:0cm;\n" +
            "            font-size:12.0pt;\n" +
            "            font-family:\"Cambria\",serif;}\n" +
            "        span.HeaderChar\n" +
            "        {mso-style-name:\"Header Char\";\n" +
            "            mso-style-link:Header;}\n" +
            "        span.FooterChar\n" +
            "        {mso-style-name:\"Footer Char\";\n" +
            "            mso-style-link:Footer;}\n" +
            "        .MsoChpDefault\n" +
            "        {font-family:\"Cambria\",serif;}\n" +
            "        .MsoPapDefault\n" +
            "        {margin-bottom:10.0pt;}\n" +
            "        /* Page Definitions */\n" +
            "        @page WordSection1\n" +
            "        {size:612.0pt 792.0pt;\n" +
            "            margin:72.0pt 72.0pt 72.0pt 72.0pt;}\n" +
            "        div.WordSection1\n" +
            "        {page:WordSection1;}\n" +
            "        /* List Definitions */\n" +
            "        ol\n" +
            "        {margin-bottom:0cm;}\n" +
            "        ul\n" +
            "        {margin-bottom:0cm;}\n" +
            "        -->\n" +
            "    </style>\n" +
            "\n" +
            "</head><h1 id=\"document-control\">Document Control</h1>\n" +
            "<table>\n" +
            "    <thead>\n" +
            "    <tr class=\"header\">\n" +
            "        <th><strong>Published Date</strong></th>\n" +
            "        <th>{{ $today }}</th>\n" +
            "    </tr>\n" +
            "    </thead>\n" +
            "    <tbody>\n" +
            "    <tr class=\"odd\">\n" +
            "        <td><strong>Policy Owner</strong></td>\n" +
            "        <td>{{ $owner-&gt;name }}, {{ $owner-&gt;jobtitle }}</td>\n" +
            "    </tr>\n" +
            "    <tr class=\"even\">\n" +
            "        <td><strong>Policy Approver</strong></td>\n" +
            "        <td>{{ $approver-&gt;name }}, {{ $approver-&gt;jobtitle }}</td>\n" +
            "    </tr>\n" +
            "    <tr class=\"odd\">\n" +
            "        <td><strong>Policy Reviewer(s)</strong></td>\n" +
            "        <td>{{ $reviewer-&gt;name }}, {{ $reviewer-&gt;jobtitle }}</td>\n" +
            "    </tr>\n" +
            "    <tr class=\"even\">\n" +
            "        <td><strong>Policy Review Period</strong></td>\n" +
            "        <td>{{ $interval }}</td>\n" +
            "    </tr>\n" +
            "    <tr class=\"odd\">\n" +
            "        <td><strong>Policy Audience</strong></td>\n" +
            "        <td>{{ $audience }}</td>\n" +
            "    </tr>\n" +
            "    </tbody>\n" +
            "</table>\n" +
            "<h1 id=\"purpose-and-scope\">Purpose and Scope</h1>\n" +
            "<ol type=\"a\">\n" +
            "    <li><p>The purpose of this policy is to define procedures to onboard and offboard users to technical infrastructure in a manner that minimises the risk of information loss or exposure.</p></li>\n" +
            "    <li><p>This policy applies to all technical infrastructure within {{ $name }}.</p></li>\n" +
            "    <li><p>This policy applies to all full-time and part-time employees and contractors.</p></li>\n" +
            "</ol>\n" +
            "<h1 id=\"background\">Background</h1>\n" +
            "<ol type=\"a\">\n" +
            "    <li><p>In order to minimise the risk of information loss or exposure (from both inside and outside the organisation), {{ $name }} is reliant on the principle of least privilege. Account creation and permission levels are restricted to only the resources absolutely needed to perform each person’s job duties. When a user’s role within {{ $name }} changes, those accounts and permission levels are changed/revoked to fit the new role and disabled when the user leaves {{ $name }} altogether.</p></li>\n" +
            "</ol>\n" +
            "<h1 id=\"policy\">Policy</h1>\n" +
            "<ol type=\"a\">\n" +
            "    <li><p><em>During onboarding:</em></p>\n" +
            "        <ol type=\"i\">\n" +
            "            <li><p>Hiring Manager informs HR upon hire of a new employee.</p></li>\n" +
            "            <li><p>HR emails IT to inform them of a new hire and their role.</p></li>\n" +
            "            <li><p>IT creates a checklist of accounts and permission levels needed for that role.</p></li>\n" +
            "            <li><p>The owner of each resource reviews and approves account creation and the associated permissions.</p></li>\n" +
            "            <li><p>IT works with the owner of each resource to set up the user.</p></li>\n" +
            "        </ol></li>\n" +
            "    <li><p><em>During offboarding:</em></p>\n" +
            "        <ol type=\"i\">\n" +
            "            <li><p>Hiring Manager notifies HR when an employee has been terminated.</p></li>\n" +
            "            <li><p>HR sends a weekly email report to IT summarizing list of users terminated and instructs IT to disable their access.</p></li>\n" +
            "            <li><p>IT terminates access within five business days from receipt of notification.</p></li>\n" +
            "        </ol></li>\n" +
            "    <li><p><em>When an employee changes roles within {{ $name }}:</em></p>\n" +
            "        <ol type=\"i\">\n" +
            "            <li><p>Hiring Manager will inform HR of a change in role.</p></li>\n" +
            "            <li><p>HR and IT will follow the same steps as outlined in the onboarding and offboarding procedures.</p></li>\n" +
            "        </ol></li>\n" +
            "    <li><p><em>Review of accounts and permissions:</em></p>\n" +
            "        <ol type=\"i\">\n" +
            "            <li><p>Each month, IT and HR will review accounts and permission levels for accuracy.</p></li>\n" +
            "        </ol></li>\n" +
            "</ol>\n";
        const blocksFromHTML = convertFromHTML(htmlData);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        );
        super(props);
        this.state = {editorState: EditorState.createWithContent(state)};
        this.onChange = editorState => this.setState({editorState});
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        document.getElementById('content').innerHTML = htmlData;
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    exportHTML = () => {
        this.setState({ convertedContent: convertToHTML(this.state.editorState.getCurrentContent()) });
    }

    focus = () => {
        this.editor.focus();
        this.exportHTML();
        console.log(this.state.convertedContent, typeof this.state.convertedContent != 'undefined');
        if (typeof this.state.convertedContent != 'undefined') {
            document.getElementById('content').innerHTML = this.state.convertedContent;
        }
        
    };

    render() {
        return (
            <div>
                <div className={editorStyles.editor} onClick={this.focus}>
                    <Toolbar>
                        {
                            // may be use React.Fragment instead of div to improve perfomance after React 16
                            (externalProps) => (
                                <div>
                                    <BoldButton {...externalProps} />
                                    <ItalicButton {...externalProps} />
                                    <UnderlineButton {...externalProps} />
                                    <CodeButton {...externalProps} />
                                    <Separator {...externalProps} />
                                    <HeadlinesButton {...externalProps} />
                                    <UnorderedListButton {...externalProps} />
                                    <OrderedListButton {...externalProps} />
                                    <BlockquoteButton {...externalProps} />
                                    <CodeBlockButton {...externalProps} />
                                    <PdfDownloadButton {...externalProps}/>
                                </div>
                            )
                        }
                    </Toolbar>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => {
                            this.editor = element;
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default MyEditor;