INSERT INTO "public"."account_permission"("id", "parentid", "permissionkey", "name", "description", "icon", "canmenu", "data", "href", "isenable", "sort", "remark", "createtime", "createusername", "updatetime", "updateusername") VALUES ('067bd55a-df65-4d51-ba87-7b4fd2452530', '536bf80c-9b30-4a35-b969-1dc2dc6c38a3', NULL, '用户组管理', NULL, 'icon-users', 1, NULL, '/Account/Access/GroupList', 1, 2, NULL, '2014-11-14 15:26:01', '王云鹏', '2014-11-14 15:39:50', '王云鹏');
INSERT INTO "public"."account_permission"("id", "parentid", "permissionkey", "name", "description", "icon", "canmenu", "data", "href", "isenable", "sort", "remark", "createtime", "createusername", "updatetime", "updateusername") VALUES ('1a8a6d01-67c9-4894-8cf8-810baec02a22', 'cf09b551-401e-4932-b735-90107696bb9d', NULL, '设置角色', NULL, 'icon-config', 0, NULL, NULL, 1, 2, NULL, '2014-11-14 10:32:51', '王云鹏', '2014-11-14 15:39:19', '王云鹏');
INSERT INTO "public"."account_permission"("id", "parentid", "permissionkey", "name", "description", "icon", "canmenu", "data", "href", "isenable", "sort", "remark", "createtime", "createusername", "updatetime", "updateusername") VALUES ('4ddd758e-f381-4290-8646-5bc6fe7331bd', 'cf09b551-401e-4932-b735-90107696bb9d', NULL, '设置特殊权限', NULL, 'icon-config', 0, NULL, NULL, 1, 5, NULL, '2014-11-14 10:34:24', '王云鹏', '2014-11-14 15:39:27', '王云鹏');
INSERT INTO "public"."account_permission"("id", "parentid", "permissionkey", "name", "description", "icon", "canmenu", "data", "href", "isenable", "sort", "remark", "createtime", "createusername", "updatetime", "updateusername") VALUES ('520dfe76-3d91-46d7-9542-24b4b0d9ae0c', '536bf80c-9b30-4a35-b969-1dc2dc6c38a3', NULL, '权限管理', NULL, 'icon-zoom', 1, NULL, '/Account/Access/PermissionList', 1, 4, NULL, '2014-11-14 15:25:12', '王云鹏', '2014-11-14 15:39:36', '王云鹏');
INSERT INTO "public"."account_permission"("id", "parentid", "permissionkey", "name", "description", "icon", "canmenu", "data", "href", "isenable", "sort", "remark", "createtime", "createusername", "updatetime", "updateusername") VALUES ('536bf80c-9b30-4a35-b969-1dc2dc6c38a3', '00000000-0000-0000-0000-000000000000', NULL, '权限管理', '10', 'icon-home', 1, NULL, NULL, 1, 99, NULL, '2014-11-14 10:31:46', '王云鹏', '2014-11-29 15:56:46', '王云鹏');
INSERT INTO "public"."account_permission"("id", "parentid", "permissionkey", "name", "description", "icon", "canmenu", "data", "href", "isenable", "sort", "remark", "createtime", "createusername", "updatetime", "updateusername") VALUES ('7040399c-6c0d-4ea5-bb06-8fe6f238cf23', 'cf09b551-401e-4932-b735-90107696bb9d', NULL, '设置组', NULL, 'icon-config', 0, NULL, NULL, 1, 1, NULL, '2014-11-14 10:32:39', '王云鹏', '2014-11-14 15:39:16', '王云鹏');
INSERT INTO "public"."account_permission"("id", "parentid", "permissionkey", "name", "description", "icon", "canmenu", "data", "href", "isenable", "sort", "remark", "createtime", "createusername", "updatetime", "updateusername") VALUES ('7d675a57-f4a1-4329-a7d9-3a51f74283fa', 'cf09b551-401e-4932-b735-90107696bb9d', NULL, '编辑用户', NULL, 'icon-edit', 0, NULL, NULL, 1, 4, NULL, '2014-11-14 10:34:09', '王云鹏', '2014-11-14 15:39:24', '王云鹏');
INSERT INTO "public"."account_permission"("id", "parentid", "permissionkey", "name", "description", "icon", "canmenu", "data", "href", "isenable", "sort", "remark", "createtime", "createusername", "updatetime", "updateusername") VALUES ('cf09b551-401e-4932-b735-90107696bb9d', '536bf80c-9b30-4a35-b969-1dc2dc6c38a3', NULL, '用户管理', NULL, 'icon-user', 1, NULL, '/Account/User/UserList', 1, 1, NULL, '2014-11-14 10:32:10', '王云鹏', '2015-06-01 19:10:11', '刘莹莹');
INSERT INTO "public"."account_permission"("id", "parentid", "permissionkey", "name", "description", "icon", "canmenu", "data", "href", "isenable", "sort", "remark", "createtime", "createusername", "updatetime", "updateusername") VALUES ('d3e373bc-b887-484a-9bb6-5081695666e7', '536bf80c-9b30-4a35-b969-1dc2dc6c38a3', NULL, '角色管理', NULL, 'icon-user', 1, NULL, '/Account/Access/RoleList', 1, 3, NULL, '2014-11-14 15:27:16', '王云鹏', '2014-11-14 15:40:52', '王云鹏');
INSERT INTO "public"."account_permission"("id", "parentid", "permissionkey", "name", "description", "icon", "canmenu", "data", "href", "isenable", "sort", "remark", "createtime", "createusername", "updatetime", "updateusername") VALUES ('fcf396eb-709a-4805-9b4c-b0dd419e81b6', 'cf09b551-401e-4932-b735-90107696bb9d', NULL, '新建用户', NULL, 'icon-add', 0, NULL, NULL, 1, 3, NULL, '2014-11-14 10:33:33', '王云鹏', '2014-11-14 15:39:21', '王云鹏');


INSERT INTO "public"."account_user"("id", "petname", "realname", "loginaccount", "loginpassword", "logintime", "loginip", "status", "phone", "email", "grouptext", "roletext", "department", "hash", "createtime", "createusername", "updatetime", "updateusername") VALUES (1, '王云鹏', '王云鹏', 'davidkingbajie@gmail.com', '25f9e794323b453885f5181f1b624d0b', '2023-11-12 12:02:51.309677', '127.0.0.1', 0, '18710351663', 'davidkingbajie@gmail.com', '开发测试组', '', '研发部', '82bbb766b6044b0421bfd89e5d8d1a50', '2023-11-09 22:41:43', '王云鹏', '2023-11-11 09:40:21.947393', '王云鹏');


INSERT INTO "public"."account_group"("id", "name", "description", "sort", "remark", "createtime", "createusername", "updatetime", "updateusername") VALUES (1, '开发测试组', '开发测试组', 1, '', '2023-11-12 11:52:44.111723', '王云鹏', '2023-11-12 11:52:44.111723', '王云鹏');


INSERT INTO "public"."account_grouppermissionassign"("id", "groupid", "permissionid", "createtime", "createusername", "updatetime", "updateusername") VALUES (1, 1, '536bf80c-9b30-4a35-b969-1dc2dc6c38a3', '2023-11-12 11:52:51.934627', '王云鹏', '2023-11-12 11:52:51.934627', '王云鹏');
INSERT INTO "public"."account_grouppermissionassign"("id", "groupid", "permissionid", "createtime", "createusername", "updatetime", "updateusername") VALUES (2, 1, 'cf09b551-401e-4932-b735-90107696bb9d', '2023-11-12 11:53:37.727116', '王云鹏', '2023-11-12 11:53:37.727116', '王云鹏');
INSERT INTO "public"."account_grouppermissionassign"("id", "groupid", "permissionid", "createtime", "createusername", "updatetime", "updateusername") VALUES (3, 1, '7040399c-6c0d-4ea5-bb06-8fe6f238cf23', '2023-11-12 11:53:37.727116', '王云鹏', '2023-11-12 11:53:37.727116', '王云鹏');
INSERT INTO "public"."account_grouppermissionassign"("id", "groupid", "permissionid", "createtime", "createusername", "updatetime", "updateusername") VALUES (4, 1, '1a8a6d01-67c9-4894-8cf8-810baec02a22', '2023-11-12 11:53:37.727116', '王云鹏', '2023-11-12 11:53:37.727116', '王云鹏');
INSERT INTO "public"."account_grouppermissionassign"("id", "groupid", "permissionid", "createtime", "createusername", "updatetime", "updateusername") VALUES (5, 1, 'fcf396eb-709a-4805-9b4c-b0dd419e81b6', '2023-11-12 11:53:37.727116', '王云鹏', '2023-11-12 11:53:37.727116', '王云鹏');
INSERT INTO "public"."account_grouppermissionassign"("id", "groupid", "permissionid", "createtime", "createusername", "updatetime", "updateusername") VALUES (6, 1, '7d675a57-f4a1-4329-a7d9-3a51f74283fa', '2023-11-12 11:53:37.727116', '王云鹏', '2023-11-12 11:53:37.727116', '王云鹏');
INSERT INTO "public"."account_grouppermissionassign"("id", "groupid", "permissionid", "createtime", "createusername", "updatetime", "updateusername") VALUES (7, 1, '4ddd758e-f381-4290-8646-5bc6fe7331bd', '2023-11-12 11:53:37.727116', '王云鹏', '2023-11-12 11:53:37.727116', '王云鹏');
INSERT INTO "public"."account_grouppermissionassign"("id", "groupid", "permissionid", "createtime", "createusername", "updatetime", "updateusername") VALUES (8, 1, '067bd55a-df65-4d51-ba87-7b4fd2452530', '2023-11-12 11:53:37.727116', '王云鹏', '2023-11-12 11:53:37.727116', '王云鹏');
INSERT INTO "public"."account_grouppermissionassign"("id", "groupid", "permissionid", "createtime", "createusername", "updatetime", "updateusername") VALUES (9, 1, 'd3e373bc-b887-484a-9bb6-5081695666e7', '2023-11-12 11:53:37.727116', '王云鹏', '2023-11-12 11:53:37.727116', '王云鹏');
INSERT INTO "public"."account_grouppermissionassign"("id", "groupid", "permissionid", "createtime", "createusername", "updatetime", "updateusername") VALUES (10, 1, '520dfe76-3d91-46d7-9542-24b4b0d9ae0c', '2023-11-12 11:53:37.727116', '王云鹏', '2023-11-12 11:53:37.727116', '王云鹏');


INSERT INTO "public"."account_usergroupassign"("id", "userid", "groupid", "expiredtime", "remark", "createtime", "createusername", "updatetime", "updateusername") VALUES (1, 1, 1, '2099-12-31 00:00:00', '', '2023-11-12 11:53:52.168517', '王云鹏', '2023-11-12 11:53:52.168517', '王云鹏');


select setval('account_user_id_seq', 2, false);

select setval('account_group_id_seq', 2, false);

select setval('account_usergroupassign_id_seq', 2, false);

select setval('account_grouppermissionassign_id_seq', 11, false);

select setval('account_grouppermissionassign_id_seq', 11, false);




