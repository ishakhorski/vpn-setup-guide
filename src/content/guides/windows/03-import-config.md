---
title: Импортируйте конфигурацию
description: Добавьте подписку и предустановки в клиент
order: 3
---

### Откройте установленный клиент и импортируйте конфигурацию

1. Скачайте файл с предустановками:
   - для РФ — <a href="/presets/v2rayn_preset_ru" download>Скачать с сервера</a>
   - для других стран — <a href="/presets/v2rayn_preset_cis" download>Скачать с сервера</a>
2. В клиенте откройте `Settings` → `Restore and Backup` → `Restore from local` и выберите скачанный файл. Программа перезапустится

<div class="w-full flex justify-center">
    <img src="../../images/restoresettings.png" alt="Восстановление настроек в v2rayN" style="max-height: 300px;" />
</div>

3. Проверьте и установите обновления: 
    1. На главном экране выберите `Help` -> `Check Update`. 
    2. Активируйте все переключатели, нажимите `Check Update`
    3. Дождитесь скачивания всех файлов.

4. Скопируйте свою ссылку-подписку и нажмите `Ctrl + V` в окне клиента
<div class="tip">

**Совет:** если `Ctrl + V` не сработало, добавьте подписку вручную: `Subscription Group` → `Subscription group settings` → `Add`. В поле `Remarks` введите название, в поле `URL` — ссылку-подписку.

</div>

5. Обновите подписку: `Subscription Group` → `Update subscriptions without proxy`

<div class="warning">

**Важно:** если у вас перестал работать VPN, попробуйте обновить подписку. Если это не помогло, то скорее всего изменился адрес сервера. В этом случае запросите новую ссылку-подписку в боте!

</div>