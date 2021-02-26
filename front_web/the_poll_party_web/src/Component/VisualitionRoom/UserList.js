import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

import FaceIcon from '@material-ui/icons/Face';

const UserList = (props) => {
    const {users, userType} = props;

    return(
        <div>
            <h2>{userType}</h2>
            <Divider />
            <List>
            {users.map((user, i) => (
                <Card className="actived" variant="outlined">
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <FaceIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.name}  />
                    </ListItem>
                </Card>
            ))}
            </List>            
        </div>
    );
}
export default UserList;