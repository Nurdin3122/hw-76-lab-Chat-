import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import React, {FormEvent, useState} from "react";

interface Props {
    onSend: () => void;
}

const MsgForm:React.FC<Props> = ({ onSend }) => {
    const [author, setAuthor] = useState("");
    const [message, setMessage] = useState("");

    const sendMsg = async (e: FormEvent) => {
        e.preventDefault();

        if (!author.trim() || !message.trim()) {
            alert('Автор и сообщение не могут быть пустыми');
            return;
        }

        const url = 'http://localhost:8020/messages';
        const data = { message, author };

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        onSend();
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={sendMsg} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Author"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    variant="outlined"
                    required
                />
                <TextField
                    label="Message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    variant="outlined"
                    required
                />
                <Button variant="contained" color="primary" type="submit">
                    Send
                </Button>
            </Box>
        </Container>
    );
};

export default MsgForm;
