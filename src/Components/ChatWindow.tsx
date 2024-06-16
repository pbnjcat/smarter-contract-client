import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';

import {
  Box,
} from "@mantine/core";



import LangMenu from "./LangMenu";
import TemplateMenu from "./TemplateBtn";

const myString = "Hello, this is a contract generated from GPT";
const outputFilePath = 'contract.pdf';
const encryptedFilePath = 'encrypted_contract.pdf';
const password = 'password';
const chat = `Generate a written contract using this chat: Freelancer (John): I saw your ad about content moderation request. Can I learn more details about it?
Company: Yes. We need people to help label the biased/unethical/extreme AI responses. We will send you questions and answers of our own AI bot, and you can rate the answer with 1-3. Rate 1 if you find the answer is biased/extreme, rate 2 if you cannot decide on if the answer is appropriate, rate 3 if you like the answer a lot. 
Freelancer (John): OK. what’s the pay?
Company: We pay by how many answers you complete. $0.1 for each anwer, and we ask for at least 1000 to start. 
Freelancer (John): I can sign up for 2000 and start from tomorrow, finish in 7 days. How do I get paid?
Company: we pay through metamask. What’s your public address?
Freelancer (John): 0xf2b12038Cbc34030d905Bd7dCa983C04947916D0
Company: OK. @bot we’re ready to sign the contract.
`

const ChatBubbleComponent: React.FC = () => {
  const [contractText, setContractText] = useState("");
  const handleGenerateContract = async () => {
    try {
      const { OpenAI } = await import('openai'); // Dynamic import
      const openai = new OpenAI({
        organization: /* replace with organization id */,
        apiKey: /* replace with own api key */,
      });

      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: chat }],
        model: "gpt-4-turbo",
      });

      const generatedContractText = completion.choices[0].message.content;
      console.log(generatedContractText);
      setContractText(generatedContractText);

      const outputFilePath = 'contract.pdf';
      const encryptedFilePath = 'encrypted_contract.pdf';
      const password = 'password';

      

    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <style>
        {`
          .cs-message--outgoing .cs-message__content {
            background-color: #007AFF !important; /* Custom background color for outgoing messages */
            color: white !important; /* Custom text color for outgoing messages */
          }

          .cs-message--incoming .cs-message__content {
            background-color: #E5E5EA !important; /* Custom background color for incoming messages */
            color: black !important; /* Custom text color for incoming messages */
          }

          .custom-textarea {
            width: 500px;
            height: 700px;
            border: 1px solid black;
            padding: 10px;
            box-sizing: border-box;
          }

          .generate-button {
            width: 200px;
            height: 50px;
            margin-top: 10px;
            background-color: #007AFF;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 16px;
            border-radius: 5px;
          }

          .generate-button:hover {
            background-color: #005bb5;
          }

          .sign-button {
            width: 200px;
            height: 50px;
            margin-top: 10px;
            background-color: #007AFF;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 16px;
            border-radius: 5px;
          }

          .sign-button:hover {
            background-color: #005bb5;
          }
        `}
      </style>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', position: 'relative', marginTop:"50px" }}>
        <div style={{ width: '500px', height: '600px', marginLeft: '-50px' }}>
          <MainContainer>
            <ChatContainer>
              <MessageList>
                <Message
                  model={{
                    message: "I saw your ad about content moderation request. Can I learn more details about it?",
                    sentTime: "just now",
                    sender: "Joe",
                    direction: "outgoing"
                  }}
                />
                <Message
                  model={{
                    message: "Yes. We need people to help label the biased/unethical/extreme AI responses. We will send you questions and answers of our own AI bot, and you can rate the answer with 1-3. Rate 1 if you find the anwer is biased/extreme, rate 2 if you cannot decide on if the answer is appropriate, rate 3 if you like the answer a lot. ",
                    sentTime: "just now",
                    sender: "Jane",
                    direction: "incoming"
                  }}
                  />
                  <Message
                  model={{
                    message: "OK. what’s the pay?",
                    sentTime: "1 minute ago",
                    sender: "Joe",
                    direction: "outgoing"
                  }}
                  />
                  <Message
                  model={{
                    message: "We pay by how many answers you complete. $0.1 for each anwer, and we ask for at least 1000 to start. ",
                    sentTime: "2 minute ago",
                    sender: "Joe",
                    direction: "incoming"
                  }}
                  />
                  <Message
                  model={{
                    message: "I can sign up for 2000 and start from tomorrow, finish in 7 days. How do I get paid? ",
                    sentTime: "just now",
                    sender: "Joe",
                    direction: "outgoing"
                  }}
                  />
                  <Message
                  model={{
                    message: "we pay through metamask. What’s your public address?",
                    sentTime: "just now",
                    sender: "Joe",
                    direction: "incoming"
                  }}
                  />
                  <Message
                  model={{
                    message: "0xf2b12038Cbc34030d905Bd7dCa983C04947916D0",
                    sentTime: "just now",
                    sender: "Joe",
                    direction: "outgoing"
                  }}
                  />
                  <Message
                  model={{
                    message: "OK. We’re ready to sign the contract.",
                    sentTime: "just now",
                    sender: "Joe",
                    direction: "incoming"
                  }}
                />
              </MessageList>
              <MessageInput placeholder="Type message here" />
            </ChatContainer>


          </MainContainer>
        </div> 


        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginLeft: '20px' }}>
          <LangMenu />
          <TemplateMenu />
          <button
            className="generate-button"
            onClick={handleGenerateContract}
          >
            Generate Contract
          </button>
          <button
            className="sign-button"
            onClick={handleGenerateContract}
          >
            Sign Contract
          </button>
        </div>
        <textarea
          className="custom-textarea"
          placeholder="Generated Contract"
          value={contractText} // Bind textarea value to state
          readOnly
          style={{ position: 'relative', right: '-100px', top: '55px', marginRight: '100px' }}
        />
      </div>
    </div>
  );
};

export default ChatBubbleComponent;
