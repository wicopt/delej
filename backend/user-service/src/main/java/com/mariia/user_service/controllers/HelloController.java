package com.mariia.user_service.controllers;

import org.springframework.web.bind.annotation.GetMapping;  // ← Добавь импорт
import org.springframework.web.bind.annotation.RestController;  // ← Добавь импорт

@RestController
public class HelloController {
    
    @GetMapping("/hello")  // ← здесь должна быть круглая скобка, а не фигурная
    public String sayHello() {
        return "Hello World";  // ← добавь точку с запятой
    }
}