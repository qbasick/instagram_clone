package org.qbasic.instagramclone.controller;

import org.qbasic.instagramclone.dto.ChatMessageDto;
import org.qbasic.instagramclone.model.ChatMessage;
import org.qbasic.instagramclone.model.ChatRoom;
import org.qbasic.instagramclone.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ChatController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat")
    //@SendTo("/queue/{chatMessage.id}")
    public void message(ChatMessageDto chatMessage) {
        ChatMessage savedMessage = chatService.saveMessageToChat(chatMessage);
        messagingTemplate.convertAndSendToUser(chatMessage.getRecipient(), "/queue/messages", savedMessage);
    }

    @GetMapping("/chat/chatrooms")
    @ResponseBody
    public List<ChatRoom> getChatRooms() {
        return chatService.getUserChats();
    }

    @GetMapping("/chat/messages/{chatId}")
    @ResponseBody
    public List<ChatMessage> getChatMessages(@PathVariable Long chatId) {
        return chatService.getUserChatMessages(chatId);
    }

}
