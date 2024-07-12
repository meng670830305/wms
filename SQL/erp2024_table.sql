drop table if exists account_group;
drop table if exists account_grouppermissionassign;
drop table if exists account_permission;
drop table if exists account_role;
drop table if exists account_rolepermissionassign;
drop table if exists account_user;
drop table if exists account_usergroupassign;
drop table if exists account_userpermissionassign;
drop table if exists account_userroleassign;
drop table if exists spring_session_attributes;
drop table if exists spring_session;

/*==============================================================*/
/* Table: account_group                                         */
/*==============================================================*/
create table account_group (
   ID                   SERIAL not null,
   Name                 varchar(50)          null,
   Description          varchar(500)         null,
   Sort                 INT4           		 null,
   Remark               varchar(100)         null,
   CreateTime           TIMESTAMP            null,
   CreateUserName       varchar(64)          null,
   UpdateTime           TIMESTAMP            null,
   UpdateUserName       varchar(64)          null,
   constraint PK_ACCOUNT_GROUP primary key (ID)
);

comment on column account_group.ID is
'自增ID';

comment on column account_group.Name is
'名称';

comment on column account_group.Description is
'描述';

comment on column account_group.Sort is
'排序';

comment on column account_group.Remark is
'备注';

/*==============================================================*/
/* Table: account_grouppermissionassign                         */
/*==============================================================*/
create table account_grouppermissionassign (
   ID                   SERIAL not null,
   GroupID              INT4                 null,
   PermissionID         varchar(50)          null,
   CreateTime           TIMESTAMP            null,
   CreateUserName       varchar(64)          null,
   UpdateTime           TIMESTAMP            null,
   UpdateUserName       varchar(64)          null,
   constraint PK_ACCOUNT_GROUPPERMISSIONASSI primary key (ID)
);

comment on column account_grouppermissionassign.ID is
'自增ID';

comment on column account_grouppermissionassign.GroupID is
'用户组ID(外键)';

comment on column account_grouppermissionassign.PermissionID is
'权限ID(外键)';

/*==============================================================*/
/* Table: account_permission                                    */
/*==============================================================*/
create table account_permission (
   ID                   varchar(50)          not null,
   ParentID             varchar(50)          null,
   PermissionKey        varchar(50)          null,
   Name                 varchar(50)          null,
   Description          varchar(500)         null,
   Icon                 varchar(50)          null,
   CanMenu              INT4                 null,
   Data                 varchar(4000)        null,
   Href                 varchar(255)         null,
   IsEnable             INT4                 null,
   Sort                 INT4                 null,
   Remark               varchar(500)         null,
   CreateTime           TIMESTAMP            null,
   CreateUserName       varchar(64)          null,
   UpdateTime           TIMESTAMP            null,
   UpdateUserName       varchar(64)          null,
   constraint PK_ACCOUNT_PERMISSION primary key (ID)
);

comment on column account_permission.ID is
'自增ID';

comment on column account_permission.ParentID is
'父ID';

comment on column account_permission.PermissionKey is
'权限KEY';

comment on column account_permission.Name is
'权限名称';

comment on column account_permission.Description is
'描述';

comment on column account_permission.Icon is
'图标';

comment on column account_permission.CanMenu is
'是否成为导航菜单';

comment on column account_permission.Data is
'其他数据[Json]';

comment on column account_permission.Href is
'导航连接';

comment on column account_permission.IsEnable is
'是否可用';

comment on column account_permission.Sort is
'排序';

comment on column account_permission.Remark is
'备注';

/*==============================================================*/
/* Table: account_role                                          */
/*==============================================================*/
create table account_role (
   ID                   SERIAL not null,
   Name                 varchar(50)          null,
   Description          varchar(500)         null,
   IsEnable             INT4                 null,
   Remark               varchar(500)         null,
   CreateTime           TIMESTAMP            null,
   CreateUserName       varchar(64)          null,
   UpdateTime           TIMESTAMP            null,
   UpdateUserName       varchar(64)          null,
   constraint PK_ACCOUNT_ROLE primary key (ID)
);

comment on column account_role.ID is
'自增ID';

comment on column account_role.Name is
'名称';

comment on column account_role.Description is
'描述';

comment on column account_role.IsEnable is
'是否可用';

comment on column account_role.Remark is
'备注';

/*==============================================================*/
/* Table: account_rolepermissionassign                          */
/*==============================================================*/
create table account_rolepermissionassign (
   ID                   SERIAL not null,
   RoleID               INT4                 null,
   PermissionID         varchar(50)          null,
   CreateTime           TIMESTAMP            null,
   CreateUserName       varchar(64)          null,
   UpdateTime           TIMESTAMP            null,
   UpdateUserName       varchar(64)          null,
   constraint PK_ACCOUNT_ROLEPERMISSIONASSIG primary key (ID)
);

comment on column account_rolepermissionassign.ID is
'自增ID';

comment on column account_rolepermissionassign.RoleID is
'角色ID(外键)';

comment on column account_rolepermissionassign.PermissionID is
'权限ID(外键)';

/*==============================================================*/
/* Table: account_user                                          */
/*==============================================================*/
create table account_user (
   ID                   SERIAL not null,
   PetName              varchar(50)          null,
   RealName             varchar(50)          null,
   LoginAccount         varchar(50)          null,
   LoginPassword        varchar(50)          null,
   LoginTime            TIMESTAMP            null,
   LoginIP              varchar(50)          null,
   Status               INT4                 null,
   Phone                varchar(50)          null,
   Email                varchar(50)          null,
   GroupText            varchar(1000)        null,
   RoleText             varchar(1000)        null,
   Department           varchar(50)          null,
   Hash                 varchar(50)          null,
   CreateTime           TIMESTAMP            null,
   CreateUserName       varchar(64)          null,
   UpdateTime           TIMESTAMP            null,
   UpdateUserName       varchar(64)          null,
   constraint PK_ACCOUNT_USER primary key (ID)
);

comment on column account_user.ID is
'用户ID';

comment on column account_user.PetName is
'昵称';

comment on column account_user.RealName is
'真实姓名';

comment on column account_user.LoginAccount is
'登录账户';

comment on column account_user.LoginPassword is
'登录密码';

comment on column account_user.LoginTime is
'最后一次登录时间';

comment on column account_user.LoginIP is
'最后一次登录IP';

comment on column account_user.Status is
'用户状态[枚举]：正常，冻结，注销.....';

comment on column account_user.Phone is
'手机/座机';

comment on column account_user.Email is
'邮箱';

comment on column account_user.GroupText is
'所属组文本(冗余字段,用“,”分割)';

comment on column account_user.RoleText is
'所属角色(冗余字段，用“,”分割)';

comment on column account_user.Department is
'所属部门';

comment on column account_user.Hash is
'用户HasH,可用于找回密码以及清空用户缓存使用';

/*==============================================================*/
/* Table: account_usergroupassign                               */
/*==============================================================*/
create table account_usergroupassign (
   ID                   SERIAL not null,
   UserID               INT4                 null,
   GroupID              INT4                 null,
   ExpiredTime          TIMESTAMP            null,
   Remark               varchar(1000)        null,
   CreateTime           TIMESTAMP            null,
   CreateUserName       varchar(64)          null,
   UpdateTime           TIMESTAMP            null,
   UpdateUserName       varchar(64)          null,
   constraint PK_ACCOUNT_USERGROUPASSIGN primary key (ID)
);

comment on column account_usergroupassign.UserID is
'用户ID(外键)';

comment on column account_usergroupassign.GroupID is
'组ID(外键)';

comment on column account_usergroupassign.ExpiredTime is
'过期时间';

comment on column account_usergroupassign.Remark is
'备注';

/*==============================================================*/
/* Table: account_userpermissionassign                          */
/*==============================================================*/
create table account_userpermissionassign (
   ID                   SERIAL not null,
   UserID               INT4                 null,
   PermissionID         varchar(50)          null,
   AssignType           INT4                 null,
   IsEnable             INT4                 null,
   ExpiredTime          TIMESTAMP            null,
   CreateTime           TIMESTAMP            null,
   CreateUserName       varchar(64)          null,
   UpdateTime           TIMESTAMP            null,
   UpdateUserName       varchar(64)          null,
   constraint PK_ACCOUNT_USERPERMISSIONASSIG primary key (ID)
);

comment on column account_userpermissionassign.UserID is
'用户ID';

comment on column account_userpermissionassign.PermissionID is
'权限ID';

comment on column account_userpermissionassign.AssignType is
'分配类型[枚举]:排除，包含';

comment on column account_userpermissionassign.IsEnable is
'是否可用';

comment on column account_userpermissionassign.ExpiredTime is
'过期时间';

/*==============================================================*/
/* Table: account_userroleassign                                */
/*==============================================================*/
create table account_userroleassign (
   ID                   SERIAL not null,
   RoleID               INT4                 null,
   UserID               INT4                 null,
   ExpiredTime          TIMESTAMP            null,
   IsEnable             INT4                 null,
   Remark               varchar(50)          null,
   CreateTime           TIMESTAMP            null,
   CreateUserName       varchar(64)          null,
   UpdateTime           TIMESTAMP            null,
   UpdateUserName       varchar(64)          null,
   constraint PK_ACCOUNT_USERROLEASSIGN primary key (ID)
);

comment on column account_userroleassign.ID is
'用户ID';

comment on column account_userroleassign.RoleID is
'角色ID(外键)';

comment on column account_userroleassign.UserID is
'用户ID(外键)';

comment on column account_userroleassign.ExpiredTime is
'过期时间';

comment on column account_userroleassign.IsEnable is
'是否可用';

comment on column account_userroleassign.Remark is
'备注';


CREATE TABLE spring_session (
                                           primary_id char(36) COLLATE pg_catalog.default NOT NULL,
                                           session_id char(36) COLLATE pg_catalog.default,
                                           creation_time int8,
                                           last_access_time int8,
                                           max_inactive_interval int4,
                                           expiry_time int8,
                                           principal_name varchar(100) COLLATE pg_catalog.default
)
;

-- ----------------------------
CREATE TABLE spring_session_attributes (
                                                      session_primary_id char(36) COLLATE pg_catalog.default,
                                                      attribute_name varchar(200) COLLATE pg_catalog.default,
                                                      attribute_bytes bytea
)
;