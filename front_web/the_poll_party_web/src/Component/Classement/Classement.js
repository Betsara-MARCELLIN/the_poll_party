import React, { useState } from "react";

// core components
import Table from "../Table/Table.js";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardBody from "../Card/CardBody.js";
import Icon from "@material-ui/core/Icon";


const Classement =(props) => {
    const { competitorRanking }= props;
    return(
        <Card>
            <CardHeader color="primary">
                <Icon>Classement</Icon>
            </CardHeader>
            <CardBody>

                <Table
                
                    tableHead={["Rang", "Nom", "Points"]}
                    tableData={competitorRanking}
                />
            </CardBody>
        </Card>
    )
}
export default Classement;