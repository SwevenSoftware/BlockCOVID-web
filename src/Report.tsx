import React from 'react'
import { Button } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {saveAs} from 'file-saver'
import Token from './Token'


const Report = () => {

    const generateReport = () => {
        const token : string | undefined = Token.getId()?.toString()
        if(token)
            fetch('/api/admin/report', {
                method: 'POST',
                headers: { 'Authorization': token }
            }).then((res) => {
                if (res.ok) { 
                    return res.blob().then(blob => {
                        const name = 'Report.pdf';
                        saveAs(blob, name);
                    });
                }
            })
    }

    return (
        <div className="marginButton">
            <Button 
                variant="contained" 
                onClick={generateReport}>
            Generate Report
            </Button>
        </div>
    )
}

export default Report;