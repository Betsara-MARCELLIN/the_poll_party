import React from "react";

// core components
import Table from "../Table/Table.js";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardBody from "../Card/CardBody.js";
import Icon from "@material-ui/core/Icon";


const Classement =(props) => {
    const { ranking }= props;

    return(
        <Card>
            <CardHeader color="primary">
                <Icon>Classement</Icon>
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