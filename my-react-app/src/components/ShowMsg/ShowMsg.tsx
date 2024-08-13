import dayjs from 'dayjs';
import React from "react";
import {Card, CardContent, Typography} from "@mui/material";

interface Props {
    author:string;
    message:string;
    dataTime:string;
}

const ShowMsg:React.FC<Props> = ({ author, message, dataTime }) => {
    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {author}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {dayjs(dataTime).format('DD.MM.YYYY HH:mm')}
                </Typography>
            </CardContent>
        </Card>
    );
};
export default ShowMsg;