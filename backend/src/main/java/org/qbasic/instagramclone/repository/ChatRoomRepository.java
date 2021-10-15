package org.qbasic.instagramclone.repository;

import org.qbasic.instagramclone.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findAllByFirstOrSecond(String first, String second);

    @Query(nativeQuery = true, value =
            "select * from chat_room " +
                    "where (first = ?1 and second = ?2) " +
                    "or (first = ?2 and second = ?1)")
    ChatRoom findByParticipants(String first, String second);
}
