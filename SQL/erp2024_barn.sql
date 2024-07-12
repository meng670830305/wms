drop table if exists barn_info;
drop table if exists barn_option;
drop table if exists barn_shelf;
drop table if exists warehouse_info;

/*==============================================================*/
/* Table: barn_info                                             */
/*==============================================================*/
create table barn_info (
   id                   SERIAL not null,
   name                 varchar(255)         null,
   description          varchar(1000)        null,
   warehouse_id         INT4                 null,
   type                 INT4                 null,
   sort                 INT4                 null,
   state                INT4                 null,
   createtime           TIMESTAMP            null,
   createusername       varchar(64)          null,
   updatetime           TIMESTAMP            null,
   updateusername       varchar(64)          null,
   constraint PK_BARN_INFO primary key (id)
);

comment on table barn_info is
'仓库房间信息';

comment on column barn_info.id is
'仓库房间ID，主键ID，自增ID';

comment on column barn_info.name is
'仓库房间名称';

comment on column barn_info.description is
'仓库房间简介';

comment on column barn_info.warehouse_id is
'仓库房间ID，外键ID';

comment on column barn_info.type is
'仓库房间类型';

comment on column barn_info.sort is
'仓库房间排列顺序';

comment on column barn_info.state is
'仓库房间状态。枚举：-1=删除，0=下架，1=上架';

comment on column barn_info.createtime is
'登録日，自動作成';

comment on column barn_info.createusername is
'登録人名称';

comment on column barn_info.updatetime is
'更新日，自動作成';

comment on column barn_info.updateusername is
'更新人名称';

/*==============================================================*/
/* Table: barn_option                                           */
/*==============================================================*/
create table barn_option (
   id                   SERIAL not null,
   barn_id              INT4                 null,
   name                 varchar(255)         null,
   values               varchar(2000)        null,
   sort                 INT4                 null,
   state                INT4                 null,
   createtime           TIMESTAMP            null,
   createusername       varchar(64)          null,
   updatetime           TIMESTAMP            null,
   updateusername       varchar(64)          null,
   constraint PK_BARN_OPTION primary key (id)
);

comment on table barn_option is
'仓库房间必选区';

comment on column barn_option.id is
'必选区ID，主键ID，自增ID';

comment on column barn_option.barn_id is
'BARNID，外键ID';

comment on column barn_option.name is
'必选区名称';

comment on column barn_option.values is
'必选区值，用逗号分割';

comment on column barn_option.sort is
'必选区排列顺序';

comment on column barn_option.state is
'必选区状态。枚举：-1=删除，0=下架，1=上架';

comment on column barn_option.createtime is
'登録日，自動作成';

comment on column barn_option.createusername is
'登録人名称';

comment on column barn_option.updatetime is
'更新日，自動作成';

comment on column barn_option.updateusername is
'更新人名称';

/*==============================================================*/
/* Table: barn_shelf                                            */
/*==============================================================*/
create table barn_shelf (
   id                   SERIAL not null,
   barn_id              INT4                 null,
   image_id             INT4                 null,
   shelf_code           TEXT                 null,
   count                INT4                 null,
   sort                 INT4                 null,
   state                INT4                 null,
   createtime           TIMESTAMP            null,
   createusername       varchar(64)          null,
   updatetime           TIMESTAMP            null,
   updateusername       varchar(64)          null,
   constraint PK_BARN_SHELF primary key (id)
);

comment on table barn_shelf is
'仓库房间里摆放物品的具体位置';

comment on column barn_shelf.id is
'PLACEID，主键ID，自增ID';

comment on column barn_shelf.barn_id is
'BARNID，外键ID';

comment on column barn_shelf.image_id is
'图片ID，外键ID';

comment on column barn_shelf.shelf_code is
'SHELF标识码：{"颜色":"红色","重量":"1kg"}';

comment on column barn_shelf.count is
'放置SKU的数量';

comment on column barn_shelf.sort is
'SHELF排列顺序';

comment on column barn_shelf.state is
'SHELF状态。枚举：-1=删除，0=下架，1=上架';

comment on column barn_shelf.createtime is
'登録日，自動作成';

comment on column barn_shelf.createusername is
'登録人名称';

comment on column barn_shelf.updatetime is
'更新日，自動作成';

comment on column barn_shelf.updateusername is
'更新人名称';

/*==============================================================*/
/* Table: warehouse_info                                        */
/*==============================================================*/
create table warehouse_info (
   id                   SERIAL not null,
   name                 varchar(255)         null,
   description          varchar(1000)        null,
   region_id            INT4                 null,
   sort                 INT4                 null,
   state                INT4                 null,
   createtime           TIMESTAMP            null,
   createusername       varchar(64)          null,
   updatetime           TIMESTAMP            null,
   updateusername       varchar(64)          null,
   constraint PK_WAREHOUSE_INFO primary key (id)
);

comment on table warehouse_info is
'仓库信息';

comment on column warehouse_info.id is
'仓库信ID，主键ID，自增ID';

comment on column warehouse_info.name is
'仓库信名称';

comment on column warehouse_info.description is
'仓库信简介';

comment on column warehouse_info.region_id is
'地区ID，外键ID';

comment on column warehouse_info.sort is
'仓库排列顺序';

comment on column warehouse_info.state is
'仓库状态。枚举：-1=删除，0=下架，1=上架';

comment on column warehouse_info.createtime is
'登録日，自動作成';

comment on column warehouse_info.createusername is
'登録人名称';

comment on column warehouse_info.updatetime is
'更新日，自動作成';

comment on column warehouse_info.updateusername is
'更新人名称';
