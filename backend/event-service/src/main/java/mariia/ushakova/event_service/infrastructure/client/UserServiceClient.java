package mariia.ushakova.event_service.infrastructure.client;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mariia.ushakova.event_service.infrastructure.security.JwtAuthenticationFilter;
import mariia.ushakova.event_service.presentation.dto.responce.UserResponse;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserServiceClient {
    
    @Value("${user.service.url:http://localhost:8080/api}")
    private String userServiceUrl;
    
    private final RestClient restClient;
    
    public List<UserResponse> getUsersByIds(List<UUID> userIds) {
        String fullUrl = userServiceUrl + "/users/batch";
        
        if (userIds == null || userIds.isEmpty()) {
            return List.of();
        }
        
        try {
            String jwtToken = JwtAuthenticationFilter.getCurrentJwtToken();
            var requestSpec = restClient.post()
                    .uri(fullUrl)
                    .body(userIds)
                    .header(HttpHeaders.AUTHORIZATION, jwtToken);
            
            
            List<UserResponse> users = requestSpec
                    .retrieve()
                    .body(new ParameterizedTypeReference<List<UserResponse>>() {});
            
            return users != null ? users : List.of();
            
        } catch (Exception e) {
            throw new RuntimeException("Не удалось получить данные пользователей: " + e.getMessage(), e);
        }
    }
}