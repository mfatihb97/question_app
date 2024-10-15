package com.example.quiz_app_2nd_be.repository;

import com.example.quiz_app_2nd_be.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepo extends JpaRepository<OurUsers,Long> {

    Optional<OurUsers> findByEmail(String email);
}
