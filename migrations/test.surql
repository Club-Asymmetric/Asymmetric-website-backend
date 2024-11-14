LET $img1 = ((CREATE photo CONTENT {
    binary: encoding::base64::decode(
        "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAB4SURBVFhH7c/RCoAwCIXh3v9xewHrXAxEbMaUSXF+6Mptfh3SHAEErAHO+xq+gj4I0MsLEGuA0XaA/nvUAtBtBTwtSyIIyN1GBBCAEggCfgDA8hkgmK8BxqPew3rmzU3xCTR71M7sPOjdaW+J/hLlbhdEAAHNAJELGOK2Qj4/myIAAAAASUVORK5CYII"),
    mime: "png",
}).id)[0];

LET $img2 = ((CREATE photo CONTENT {
    binary: encoding::base64::decode(
        "/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAgACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/Kz9d8TW3h57VbjcWupfLULjKgAlnbJGEUDLHsK0KyLjw9/bN9qTXfmKs0JsoCsnAhZFLsByAxYkZI6Rrx6/P8S1szhhFTyhL205JJyTcYpJybl2uouEW9FOUbm+HjTcr1dl/X/B9DXoqn4f1B9V0GxupAqyXNvHKwUfKCygnHtzVyvWwOMp4vD08VR+GcVJekldfgzKcXGTi+gVBf6nbaVCJLq4gto2baGlkCKT6ZPfg/lU9YqfD/SotSmvI4Z4bq4ZmkkiupY2cscn7rDgnnHSvOzqpm8YRWUU6UpN+86k5RUV3SjTnzv+65Q783Q0oqlf9638kn+bVvxG6DrNrougW63lxHYx75Y7dLo+S3lJIyoMPg8Js689M8mtizu1vrZZUWRVbOBJG0bdccqwBH4iquk+GtP0Lb9jsra3ZU8vekYDleOC3U9B1PNXq5OGcDmmEwlLD4+VO1OEYKMFJu8YxV+eTjdOzdvZq11q7O9YidOUnKF9XfX/AC/4J//Z"),
    mime: "jpeg",
}).id)[0];

LET $img3 = ((CREATE photo CONTENT {
    binary: encoding::base64::decode(
        "R0lGODlhIAAgAHAAACH5BAEAAPwALAAAAAAgACAAhwAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAAAjtAPcJHEiwoMGDCBMqXMiwocOC+h461EcxokSFFJPNs3gRob588pxR7OjR2b18yEju4yiQojx8+TaqJJjxWb58yUbOFBgzor6NLEnqS5bP59CgQRs6y0cQKMkhGoYctajP5s59UWnOKzoQmsNoBIlkINKSqMqkGaAO4XpVqwaDSS/GTDuzHsSbAjPsZIlT3xAiHO1ihLvy49iVhX1eHMuYLMWb+pAlm1gx3xB8MIsOlZdMXsV9YBNSRIbvWDx8GfKdRjYvp1GPEOUdw3ePNZHMn4VWpJhBsUTBcfcNYRh8od62BsWKHY5caOiOQQMCADs"),
    mime: "gif",
}).id)[0];

RETURN [$img1, $img2, $img3];

((CREATE event CONTENT {
    name: "Tales of Threat",
    participants: 100,
    description: "Story about different Cyber Threats",
    date: time::now(),
    photos: [ $img1, $img3 ],
}).id)[0];

((CREATE event CONTENT {
    name: "Horror Codes",
    participants: 150,
    description: "Code in Fear >:)",
    date: time::now() + 2w,
    photos: [ $img2, $img2 ],
}).id)[0];

((CREATE podcast CONTENT {
    name: "First Podcast",
    publish: time::now(),
    guests: ["Alice", "Bob"],
    description: "Our first podcast",
    audio: encoding::base64::decode(""),
    image: $img2,
}).id)[0];

((CREATE event CONTENT {
    name: "Noice Workshop",
    participants: 10,
    description: "Just Very Noice..",
    date: time::now() + 1w,
    photos: [ $img3 ],
}).id)[0];

