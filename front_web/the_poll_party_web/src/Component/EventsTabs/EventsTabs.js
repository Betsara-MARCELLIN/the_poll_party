import React from "react";

import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AnnouncementIcon from '@material-ui/icons/Announcement';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Code from "@material-ui/icons/Code";

// components
import CustomTabs from "../CustomTabs/CustomTabs.js";
import QuestionForm from "./QuestionForm"

const EventsTabs = (props) => {
    const { sendQuestion } = props;

    return(
        <CustomTabs
        title="Actions:"
        headerColor="primary"
        tabs={[
            {
            tabName: "Créer une Question",
            tabIcon: QuestionAnswerIcon,
            tabContent: (
                <QuestionForm sendQuestion={sendQuestion}/>
            )
            },
            {
            tabName: "Ajouter un Malus",
            tabIcon: AnnouncementIcon,
            tabContent: (
                <div>Malus</div>
            )
            },
            {
            tabName: "Autres...",
            tabIcon: Code,
            tabContent: (
                <div>autres</div>
            )
            }
        ]}
    />   
    )
}

export default EventsTabs;