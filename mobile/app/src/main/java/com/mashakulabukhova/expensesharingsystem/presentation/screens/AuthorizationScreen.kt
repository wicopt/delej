package com.mashakulabukhova.expensesharingsystem.presentation.screens

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.mashakulabukhova.expensesharingsystem.presentation.components.CustomOutlinedTextField

@Preview
@Composable
fun Test() {
    AuthorizationScreen()
}

@Composable
fun AuthorizationScreen() {

    Column(
        modifier = Modifier
            .fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {

        Text(text = "Авторизация", color = MaterialTheme.colorScheme.onBackground)

        Column(
            modifier = Modifier
                .fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Text(text = "Email", color = MaterialTheme.colorScheme.onBackground)
            CustomOutlinedTextField("Email", {}, Modifier.fillMaxWidth())
            Text(text = "Пароль", color = MaterialTheme.colorScheme.onBackground)
            CustomOutlinedTextField("Password", {}, Modifier.fillMaxWidth())
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
        ) {
            Checkbox(
                checked = false,
                onCheckedChange = {},
                modifier = Modifier
                    .background(Color.Magenta)
                    .padding(0.dp)
            )
            Text(text = "Запомнить пароль", modifier = Modifier.background(Color.Red), color = MaterialTheme.colorScheme.onBackground)
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
        ) {
            Text(text = "Забыли пароль?", color = MaterialTheme.colorScheme.onBackground)
            Text(text = "Восстановить ", modifier = Modifier
                .clickable{
                    Log.d("Authorization", "Opening a link")
                },
                color = MaterialTheme.colorScheme.tertiary,
                textDecoration = TextDecoration.Underline)
        }

        Button({}) {
            Text(text = "Войти", color = MaterialTheme.colorScheme.onPrimary)
        }

        Text(text = "Нет аккаунта?", color = MaterialTheme.colorScheme.onBackground)

        Button({}) {
            Text(text = "Зарегистрироваться", color = MaterialTheme.colorScheme.onPrimary)
        }
    }
}