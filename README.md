# Ionic Pre-populated sqlite

### Plugins

- `https://github.com/an-rahulpandey/cordova-plugin-dbcopy`
- `https://github.com/litehelpers/Cordova-sqlite-storage`

### Schema

```sql
CREATE TABLE tb_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);
CREATE TABLE tb_lists (id INTEGER PRIMARY KEY AUTOINCREMENT, cid INT, name TEXT);
CREATE TABLE tb_items (id INTEGER PRIMARY KEY AUTOINCREMENT, cid INT, lid INT, name TEXT);
```