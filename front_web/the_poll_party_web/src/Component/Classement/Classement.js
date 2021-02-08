import React from "react";

import { makeStyles } from "@material-ui/core/styles";

// core components
import Table from "../Table/Table.js";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardBody from "../Card/CardBody.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);


const Classement =(props) => {

    const classes = useStyles(); 
    return(
        <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Classement</h4>
                <p className={classes.cardCategoryWhite}>
                    Classement de la partie en cours
                </p>
            </CardHeader>
            <CardBody>
                <Table
                    tableHead={["Rang", "Nom", "Points"]}
                    tableData={[
                        ["1", "Dakota Rice", "36"],
                        ["2", "Minerva Hooper", "23"],
                        ["3", "Sage Rodriguez", "19"],
                        ["4", "Philip Chaney", "18"]
                    ]}
                />
            </CardBody>
        </Card>
    )
}
export default Classement;