{
  "version": "6",
  "dialect": "sqlite",
  "id": "250360be-05bf-4d14-87c8-c5b2d16a1ca8",
  "prevId": "08a77ed6-9eb2-4469-9a28-49ca67513357",
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
    "leave_requests": {
      "name": "leave_requests",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
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
        "leave_type": {
          "name": "leave_type",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "start_date": {
          "name": "start_date",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "end_date": {
          "name": "end_date",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "slots_json": {
          "name": "slots_json",
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
        "reason": {
          "name": "reason",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "''"
        },
        "destination": {
          "name": "destination",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "''"
        },
        "work_arrangement": {
          "name": "work_arrangement",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "''"
        },
        "comp_source": {
          "name": "comp_source",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "''"
        },
        "status": {
          "name": "status",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'pending'"
        },
        "review_note": {
          "name": "review_note",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "''"
        },
        "reviewed_at": {
          "name": "reviewed_at",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
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
      "indexes": {},
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
        "annual_leave_entitlement": {
          "name": "annual_leave_entitlement",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
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