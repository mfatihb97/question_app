package com.example.quiz_app_2nd_be.service;

import com.example.quiz_app_2nd_be.dto.RequestResponse;
import com.example.quiz_app_2nd_be.entity.OurUsers;
import com.example.quiz_app_2nd_be.repository.UsersRepo;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UsersManagementService {

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public RequestResponse register(RequestResponse registrationRequest) {
        RequestResponse response = new RequestResponse();

        try {

            if (usersRepo.findByEmail(registrationRequest.getEmail()).isPresent()) {
                response.setMessage("Bu email adresi kullanımda!");
                response.setStatusCode(400);
                throw new Exception("Bu email adresi kullanımda!");
            }else{
                OurUsers ourUser = new OurUsers();
                ourUser.setEmail(registrationRequest.getEmail());
                ourUser.setCity(registrationRequest.getCity());
                ourUser.setRole(registrationRequest.getRole());
                ourUser.setName(registrationRequest.getName());
                ourUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

                OurUsers savedUser = usersRepo.save(ourUser);

                if (savedUser.getId() > 0) {
                    response.setOurUsers(savedUser);
                    response.setMessage("User saved successfully.");
                    response.setStatusCode(200);
                }
            }
            return response;


        } catch (Exception e) {
            response.setMessage("An error occurred while saving the user.");
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }

        return response;
    }


    public RequestResponse login(RequestResponse loginRequest){
        RequestResponse response = new RequestResponse();

        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail()
                            ,loginRequest.getPassword()));
            var user = usersRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(),user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully logged in");
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    public RequestResponse refreshToken(RequestResponse refreshTokenRequest){
        RequestResponse response = new RequestResponse();

        try {
            String ourEmail= jwtUtils.extractUsername(refreshTokenRequest.getToken());
            OurUsers users = usersRepo.findByEmail(ourEmail).orElseThrow();
            if(jwtUtils.isTokenValid(refreshTokenRequest.getToken(),users)){
                var jwt = jwtUtils.generateToken(users);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24Hrs");
                response.setMessage("Successfully refreshed token");
            }
            response.setStatusCode(200);
            return response;
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public RequestResponse getAllUsers(){
        RequestResponse response = new RequestResponse();
        try {
            List<OurUsers> result = usersRepo.findAll();
            if(!result.isEmpty()){
                response.setOurUsersList(result);
                response.setStatusCode(200);
                response.setMessage("Successful");
            }else {
                response.setStatusCode(400);
                response.setMessage("No users found");
            }
            return response;
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occured: "+ e.getMessage());
            return response;
        }
    }

    public RequestResponse getUsersById(Long id){
        RequestResponse response = new RequestResponse();

        try {
            OurUsers usersById = usersRepo.findById(id).orElseThrow(()->new RuntimeException("User not found!"));
            response.setOurUsers(usersById);
            response.setStatusCode(200);
            response.setMessage("Users with id '" + id + "' found successfully");
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occured "+ e.getMessage());
        }
        return response;
    }

    public RequestResponse deleteUser(Long id){
        RequestResponse response = new RequestResponse();

        try {
            Optional<OurUsers> usersOptional = usersRepo.findById(id);
            if(usersOptional.isPresent()){
                usersRepo.deleteById(id);
                response.setStatusCode(200);
                response.setMessage("User deleted successfully");
            }else {
                response.setStatusCode(404);
                response.setMessage("User not found for deletion");
            }
        }catch (Exception e ){
            response.setStatusCode(500);
            response.setMessage("Error occured while deleting user: "+ e.getMessage());

        }
        return response;
    }


    public RequestResponse updateUser(Long id , OurUsers updatedUser){
        RequestResponse response = new RequestResponse();
        try {
            Optional<OurUsers> usersOptional = usersRepo.findById(id);
            if (usersOptional.isPresent()){
                OurUsers existingUser = usersOptional.get();
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setName(updatedUser.getName());
                existingUser.setCity(updatedUser.getCity());
                existingUser.setRole(updatedUser.getRole());

                if(updatedUser.getPassword()!= null && !updatedUser.getPassword().isEmpty()){
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                OurUsers savedUuser = usersRepo.save(existingUser);
                response.setOurUsers(savedUuser);
                response.setStatusCode(200);
                response.setMessage("User updated dsuccessfully");
            }else {
                response.setStatusCode(404);
                response.setMessage("User not found for updaet");
            }
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred while updating user: "+e.getMessage());
        }
        return response;
    }

    public RequestResponse getMyInfo(String email){
        RequestResponse response = new RequestResponse();
        try {

            Optional<OurUsers> usersOptional = usersRepo.findByEmail(email);
            if(usersOptional.isPresent()){
                response.setOurUsers(usersOptional.get());
                response.setStatusCode(200);
                response.setMessage("successful");
            }else {
                response.setStatusCode(404);
                response.setMessage("User not found for update");
            }

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occured while getting suer info: "+ e.getMessage());
        }
        return response;
    }
}
