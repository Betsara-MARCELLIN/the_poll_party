import React from "react";

// @material-ui/icons
import AnnouncementIcon from '@material-ui/icons/Announcement';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Code from "@material-ui/icons/Code";

// components
import CustomTabs from "../CustomTabs/CustomTabs.js";
import QuestionForm from "./QuestionForm"

const EventsTabs = (props) => {
    const { sendQuestion , isClosedQuestion} = props;

    const renderer = () => {
        if(isClosedQuestion){
            return <h4 className="text-center">Le maximum de question a été atteint.</h4>
        }
        return <QuestionForm sendQuestion={sendQuestion} />
      };

    return(
        <CustomTabs
        title="Actions:"
        headerColor="primary"
        tabs={[
            {
            tabName: "Créer une Question",
            tabIcon: QuestionAnswerIcon,
            tabContent: (
                renderer()
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