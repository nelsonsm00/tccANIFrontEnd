/* IMPORT REACT */
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';


/* IMPORT GERAL */

export default (props) => {
    var classe = props.hasOwnProperty("classe")
        ? props.classe
        : "";

    var editor = props.editor;

    var funcao = props.hasOwnProperty("funcao")
        ? props.funcao
        : () => {}
    var ativo = props.hasOwnProperty("ativo")
        ? props.ativo
        : true;

    return (
        <>
            <Editor 
                editorState={editor}
                wrapperClassName="editor"
                editorClassName="editorBox"
                onEditorStateChange={funcao}
                disabled={!ativo}
            />
        </>
    );
};
