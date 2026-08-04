{
  "version": "6",
  "dialect": "sqlite",
  "id": "08a77ed6-9eb2-4469-9a28-49ca67513357",
  "prevId": "a53b7389-cc64-4f6c-86a5-2908e105ca55",
  "tables": {
    "attendance": {
      "name": "attendance",
      "columns": {
        "id": {
          "name": "id",
          "type": "integer",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": true
        },
        "staff_id": {
          "name": "staff_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "staff_name": {
          "name": "staff_name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "period": {
          "name": "period",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "status": {
          "name": "status",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "note": {
          "name": "note",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "''"
        },
        "work_date": {
          "name": "work_date",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'2026-07-23'"
        },
        "updated_at": {
          "name": "updated_at",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "comp_leave_claims": {
      "name": "comp_leave_claims",
      "columns": {
        "id": {
          "name": "id",
          "type": "integer",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": true
        },
        "staff_id": {
          "name": "staff_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "staff_name": {
          "name": "staff_name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "week_start": {
          "name": "week_start",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "week_end": {
          "name": "week_end",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "sections": {
          "name": "sections",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {
        "comp_leave_staff_week_idx": {
          "name": "comp_leave_staff_week_idx",
          "columns": [
            "staff_id",
            "week_start"
          ],
          "isUnique": true
        }
      },
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "staff_members": {
      "name": "staff_members",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "weekly_target": {
          "name": "weekly_target",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "active": {
          "name": "active",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 1
        },
        "created_at": {
          "name": "created_at",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    }
  },
  "views": {},
  "enums": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "indexes": {}
  }
}