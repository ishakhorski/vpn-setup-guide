---
title: Настройка UWP-приложений
description: Исправьте работу приложений из Microsoft Store
order: 7
---

Из-за систем безопасности Windows UWP-приложения (Microsoft Store, Яндекс Музыка, Часы и другие) не работают при включённом системном прокси.

<div class="tip">

**Совет:** для режима TUN эта настройка не требуется — он работает с UWP-приложениями без дополнительных действий.

</div>

### Решение

1. Перейдите в `Settings` → `Set Win10 UWP Loopback`
2. В открывшемся окне нажмите `Exempt All`
3. Найдите в списке `Usermode Front Driver Host` и снимите с него галочку (если такого пункта нет — отлично)
4. Нажмите `Save Changes`

<div class="w-full flex justify-center">
    <img src="../../images/win10loopback.png" alt="Настройка Win10 UWP Loopback" style="max-height: 400px;" />
</div>

Теперь UWP-приложения работают.

<div class="warning">

**Важно:** при установке новых UWP-приложений придётся повторить этот шаг, выделяя в списке новое приложение.

</div>
