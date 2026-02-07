---
title: Настройка Discord
description: Исправьте голосовые чаты через прокси
order: 6
---

Discord не пропускает голосовые чаты через системный прокси. Для решения этой проблемы нужно установить дополнительные файлы.

### Установка

1. Скачайте два файла: [DWrite.dll](https://github.com/runetfreedom/discord-voice-proxy/releases/latest/download/DWrite.dll) и [force-proxy.dll](https://github.com/runetfreedom/discord-voice-proxy/releases/latest/download/force-proxy.dll)
2. Перейдите в папку Discord: откройте проводник и вставьте в адресную строку `%LocalAppData%\Discord`
3. Найдите самую свежую папку `app-` (например, `app-1.0.9187`) и перетащите в неё оба скачанных файла
4. В этой же папке создайте файл `proxy.txt` со следующим содержимым:

```
SOCKS5_PROXY_ADDRESS=127.0.0.1
SOCKS5_PROXY_PORT=10809
```

5. Перезапустите Discord — голосовые чаты должны заработать

<div class="warning">

**Важно:** убедитесь, что файл действительно называется `proxy.txt`, а не `proxy.txt.txt`. Это может произойти, если в системе отключено отображение расширений файлов. В таком случае создайте файл с названием `proxy` — система автоматически добавит расширение `.txt`.

</div>
