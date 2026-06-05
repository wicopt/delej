import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
 const ProtectedRoute=({children})=>{
    const {user, loading} = useAuth();// получаем состояние авторизации из контекста
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');//что бы выиграть гонку (токен существует даже если юзер еще нет )
    // Пока идёт проверка показать
  if (loading) {
    return <div>Загрузка...</div>; 
  }
   // Если пользователь не авторизован — редирект на страницу входа
   if (!user&&!token){
    return(
        <Navigate to ="/" replace/>//replace заменяет текущую запись в истории, чтобы пользователь не мог вернуться к защищённой странице через кнопку «назад».
    )
   }
   return children;

 };
 export default ProtectedRoute;