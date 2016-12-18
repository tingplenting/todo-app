# Ionic ToDo App

### Library

- fullcalendar + uicalendar.js
- https://github.com/angular-ui/ui-calendar

```sh
bower install ngCordova
bower install --save angular-ui-calendar
```

### Plugins

```sh
cordova plugin add https://github.com/litehelpers/Cordova-sqlite-storage.git
cordova plugin add https://github.com/an-rahulpandey/cordova-plugin-dbcopy.git
```

### Schema

```sql
CREATE TABLE tb_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);
CREATE TABLE tb_lists (id INTEGER PRIMARY KEY AUTOINCREMENT, cid INT, name TEXT);
CREATE TABLE tb_items (id INTEGER PRIMARY KEY AUTOINCREMENT, cid INT, lid INT, name TEXT);
```
