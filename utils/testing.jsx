import { useUserList } from "hooks/useUserList";
import { useUserVariableGet } from "hooks/useUserVariableGet";
import { useUserListSet } from "hooks/useUserListSet";
import { useUserListGet } from "hooks/useUserListGet";
import { useState } from "react";

const [score, setScore] = useUserVariable<number>({
    key: "score",
    defaultValue: 0,
    privacy: "PUBLIC",
    

});

const [messages, setMessages] = useUserVariable<string>({
    key: "message",
    defaultValue: "",
    privacy: "PUBLIC",
});



// get all scores
const scores = useUserVariableGet({
    key: "score",
    returnTop: 10,
})



// HEERE DOWN



const currentPersonMEssaging = useUserVariableGet({
    key: "userData",
    searchFor: "ZARA",
});

const me = useUserVariableGet({
    key: "userData",
});

const messsagesArray = useUserList({
    key: "messages",
    defaultValue: [],
    privacy: "PRIVATE",
    filterKey: "recipient",
});

const setMessage = useUserListSet(
    // set privacy to zara
);

const send = () => {
    const messageContainer = {message: typedMessage, recipient: currentPersonMEssaging}
    setMessage(messageContainer);
}



const OtherPersonMessages = useUserListGet({
    key: "messages",
    userIds: [currentPersonMEssaging],
    filterFor: me
});

const MyMessagesToOtherPerson = useUserListGet({
    key: "messages",
    userIds: [me],
    filterFor: currentPersonMEssaging
});



const [typedMessage, setTypedMessage] = useState("");


// some map over OtherPersonMessages and MyMessagesToOtherPerson



// Textinput chages messaeg

<Button onClick={() => sendMessage(typedMessage)}>Send</Button>


