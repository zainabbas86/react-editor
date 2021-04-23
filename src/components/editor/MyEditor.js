import React, {Component} from 'react';
import '../../resources/css/MyEditor.css';
import {EditorState, RichUtils, ContentState, convertFromHTML} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin, { Separator,} from '@draft-js-plugins/static-toolbar';
import editorStyles from '../../resources/css/MyEditor.css';
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
import htmlData from '../../resources/html/data.html';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import 'draft-js/dist/Draft.css';

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

class MyEditor extends React.Component {

    constructor(props) {
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