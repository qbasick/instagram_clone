package org.qbasic.instagramclone.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ChatMessage {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;
    String author;

    public ChatMessage(String author, Long chatRoomId, String payload, Instant createdAt) {
        this.author = author;
        this.chatRoomId = chatRoomId;
        this.payload = payload;
        this.createdAt = createdAt;
    }

    Long chatRoomId;
    String payload;
    Instant createdAt;
}
