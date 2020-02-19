import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { API } from "aws-amplify";
import {s3Upload} from "../libs/awsLib";

export default function NewNote(props) {
    // useRef does not cause the component to re-render
    // It simply tells React to store a value for us so that we can use it later
    // We can set and get the value of ref by using its `current` property
    const file = useRef(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return content.length > 0;
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB`
            );
            return;
        }

        setIsLoading(true);

        try {
            // Upload the file using the s3Upload method
            const attachment = file.current
                ? await s3Upload(file.current)
                : null;

            // Use the returned key and add to the note object when we create the note
            await createNote({ content, attachment });
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function createNote(note) {
        // the first two arguments to the API.post() method are notes and /notes
        // this is because in our `index.js` file, we configure the Amplify endpoint to be `notes`
        return API.post("notes", "/notes", {
            body: note
        })
    }

    return (
        <div className={"NewNote"}>
            <form onSubmit={handleSubmit}>
                <FormGroup controlId={"content"}>
                    <FormControl
                        value={content}
                        componentClass={"textarea"}
                        onChange={e => setContent(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId={"file"}>
                    <ControlLabel>Attachment</ControlLabel>
                    <FormControl
                        onChange={handleFileChange}
                        type={"file"}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type={"submit"}
                    bsSize={"large"}
                    bsStyle={"primary"}
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Create
                </LoaderButton>
            </form>
        </div>
    )
}
