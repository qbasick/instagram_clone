package org.qbasic.instagramclone.service;

import org.qbasic.instagramclone.dto.ChatMessageDto;
import org.qbasic.instagramclone.model.ChatMessage;
import org.qbasic.instagramclone.model.ChatRoom;
import org.qbasic.instagramclone.repository.ChatMessageRepository;
import org.qbasic.instagramclone.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ChatService {

    private final AuthService authService;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    @Autowired
    public ChatService(AuthService authService, ChatRoomRepository chatRoomRepository, ChatMessageRepository chatMessageRepository) {
        this.authService = authService;
        this.chatRoomRepository = chatRoomRepository;
        this.chatMessageRepository = chatMessageRepository;
    }

    public List<ChatRoom> getUserChats() {
        String author = authService.getCurrentUser().getUsername();
        return chatRoomRepository.findAllByFirstOrSecond(author, author);
    }

    public List<ChatMessage> getUserChatMessages(Long chatId) {
        return chatMessageRepository.findAllByChatRoomId(chatId);
    }

    public ChatMessage saveMessageToChat(ChatMessageDto message) {
        String author = authService.getCurrentUser().getUsername();
        ChatRoom chatRoom = chatRoomRepository.findByParticipants(author, message.getRecipient());

        if (chatRoom == null) {
            chatRoom = chatRoomRepository.save(new ChatRoom(author, message.getRecipient()));
        }

        return chatMessageRepository.save(new ChatMessage(author, chatRoom.getId(), message.getPayload(), Instant.now()));
    }

}
