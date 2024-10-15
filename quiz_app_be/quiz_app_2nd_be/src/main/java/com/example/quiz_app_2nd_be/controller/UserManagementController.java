package com.example.quiz_app_2nd_be.controller;

import com.example.quiz_app_2nd_be.dto.RequestResponse;
import com.example.quiz_app_2nd_be.entity.OurUsers;
import com.example.quiz_app_2nd_be.service.UsersManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserManagementController {

    @Autowired
    private UsersManagementService usersManagementService;

    @PostMapping("/auth/register")
    public ResponseEntity<RequestResponse> register(@RequestBody RequestResponse reg) throws Exception {
        return ResponseEntity.ok(usersManagementService.register(reg));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<RequestResponse> login(@RequestBody RequestResponse login){
        return ResponseEntity.ok(usersManagementService.login(login));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<RequestResponse> refreshToken(@RequestBody RequestResponse req){
        return ResponseEntity.ok(usersManagementService.refreshToken(req));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<RequestResponse> getAllUsers(){
        return ResponseEntity.ok(usersManagementService.getAllUsers());
    }

    @GetMapping("/admin/get-user/{userId}")
    public ResponseEntity<RequestResponse> getUserById(@PathVariable Long userId){
        return ResponseEntity.ok(usersManagementService.getUsersById(userId));
    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<RequestResponse> updateUser(@PathVariable Long userId,@RequestBody OurUsers reqres){
        return ResponseEntity.ok(usersManagementService.updateUser(userId,reqres));
    }

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<RequestResponse> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        RequestResponse response = usersManagementService.getMyInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<RequestResponse> deleteUser(@PathVariable Long userId){
        return ResponseEntity.ok(usersManagementService.deleteUser(userId));
    }
}
