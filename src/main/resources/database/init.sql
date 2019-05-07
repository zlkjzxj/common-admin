/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : sys_admin

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2018-12-26 14:50:23
*/

# CREATE DATABASE `zl_manager` DEFAULT CHARACTER SET UTF8 COLLATE UTF8_GENERAl_CI;

#mysqldump db1 -u root -p123456 --add-drop-table | mysql newdb -u root -p123456
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS sys_log;
CREATE TABLE sys_log (
  id            INT(10) NOT NULL AUTO_INCREMENT
  COMMENT '主键ID',
  user_id       INT(10)          DEFAULT NULL
  COMMENT '用户ID',
  user_name     VARCHAR(50)      DEFAULT NULL
  COMMENT '用户名',
  oper_method   VARCHAR(250)     DEFAULT NULL
  COMMENT '操作方法',
  request_param VARCHAR(500)     DEFAULT NULL
  COMMENT '操作参数',
  oper_desc     VARCHAR(255)     DEFAULT NULL
  COMMENT '操作说明',
  update_time   DATETIME         DEFAULT CURRENT_TIMESTAMP
  COMMENT '修改时间',
  create_time   DATETIME         DEFAULT CURRENT_TIMESTAMP
  COMMENT '创建时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 44
  DEFAULT CHARSET = utf8
  COMMENT ='系统日志';

-- ----------------------------
-- Records of sys_log
-- ----------------------------

-- ----------------------------
-- Table structure for sys_login_log
-- ----------------------------
DROP TABLE IF EXISTS sys_login_log;
CREATE TABLE sys_login_log (
  id                 INT(10) NOT NULL AUTO_INCREMENT
  COMMENT '主键ID',
  user_id            INT(10)          DEFAULT NULL
  COMMENT '用户ID',
  user_name          VARCHAR(50)      DEFAULT NULL
  COMMENT '用户名',
  ip_address         VARCHAR(50)      DEFAULT NULL
  COMMENT 'IP地址',
  geography_location VARCHAR(50)      DEFAULT NULL
  COMMENT '地理位置',
  update_time        DATETIME         DEFAULT CURRENT_TIMESTAMP
  COMMENT '修改时间',
  create_time        DATETIME         DEFAULT CURRENT_TIMESTAMP
  COMMENT '创建时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 71
  DEFAULT CHARSET = utf8
  COMMENT ='登录日志';

-- ----------------------------
-- Records of sys_login_log
-- ----------------------------

-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS sys_permission;
CREATE TABLE sys_permission (
  id              INT(10) NOT NULL AUTO_INCREMENT
  COMMENT '主键ID',
  available       TINYINT(1)       DEFAULT NULL
  COMMENT '是否可用',
  permission_name VARCHAR(50)      DEFAULT NULL
  COMMENT '权限名称',
  parent_id       INT(10)          DEFAULT NULL
  COMMENT '父权限ID',
  parent_ids      VARCHAR(255)     DEFAULT NULL
  COMMENT '父权限ID列表',
  permission_code VARCHAR(50)      DEFAULT NULL
  COMMENT '权限编码',
  resource_type   VARCHAR(50)      DEFAULT NULL
  COMMENT '资源类型(top_directory/directory/menu/button)',
  url             VARCHAR(50)      DEFAULT NULL
  COMMENT '资源路径',
  update_time     DATETIME         DEFAULT CURRENT_TIMESTAMP
  COMMENT '修改时间',
  create_time     DATETIME         DEFAULT CURRENT_TIMESTAMP
  COMMENT '创建时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 34
  DEFAULT CHARSET = utf8
  COMMENT ='系统权限';

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
INSERT INTO sys_permission
VALUES ('1', '1', '系统管理', '0', '0', 'system', 'top_directory', NULL, '2018-07-10 11:24:48', '2018-07-10 11:24:48');
INSERT INTO sys_permission
VALUES ('2', '1', '用户管理', '1', '0/1', 'user:view', 'menu', '/user/list', '2018-07-10 11:24:48', '2018-07-10 11:24:48');
INSERT INTO sys_permission
VALUES ('3', '1', '添加', '2', '0/1/2', 'user:add', 'button', '', '2018-07-10 11:25:40', '2018-07-10 11:25:40');
INSERT INTO sys_permission
VALUES ('4', '1', '删除', '2', '0/1/2', 'user:del', 'button', '', '2018-07-10 11:27:10', '2018-07-10 11:27:10');
INSERT INTO sys_permission
VALUES ('5', '1', '编辑', '2', '0/1/2', 'user:edit', 'button', '', '2018-11-17 14:54:52', '2018-07-10 11:27:36');
INSERT INTO sys_permission
VALUES ('6', '1', '角色管理', '1', '0/1', 'role:view', 'menu', '/role/list', '2018-08-04 09:38:44', '2018-08-04 09:38:44');
INSERT INTO sys_permission
VALUES ('7', '1', '添加', '6', '0/1/6', 'role:add', 'button', '', '2018-08-04 09:42:05', '2018-08-04 09:42:05');
INSERT INTO sys_permission
VALUES ('8', '1', '删除', '6', '0/1/6', 'role:del', 'button', '', '2018-11-17 15:01:41', '2018-08-04 09:43:26');
INSERT INTO sys_permission
VALUES ('9', '1', '编辑', '6', '0/1/6', 'role:edit', 'button', '', '2018-08-04 09:46:01', '2018-08-04 09:46:01');
INSERT INTO sys_permission VALUES
  ('10', '1', '权限管理', '1', '0/1', 'permission:view', 'menu', '/permission/list', '2018-08-04 09:48:57',
   '2018-08-04 09:48:57');
INSERT INTO sys_permission
VALUES ('11', '1', '添加', '10', '0/1/10', 'permission:add', 'button', '', '2018-08-04 09:50:50', '2018-08-04 09:50:50');
INSERT INTO sys_permission
VALUES ('12', '1', '删除', '10', '0/1/10', 'permission:del', 'button', '', '2018-08-04 09:50:50', '2018-08-04 09:50:50');
INSERT INTO sys_permission
VALUES ('13', '1', '编辑', '10', '0/1/10', 'permission:edit', 'button', '', '2018-08-23 11:33:34', '2018-08-23 11:33:34');
INSERT INTO sys_permission
VALUES ('14', '1', '测试管理', '0', '0', 'test', 'top_directory', NULL, '2018-10-01 14:15:32', '2018-07-10 11:24:48');
INSERT INTO sys_permission VALUES
  ('16', '1', '登录日志', '1', '0/1', 'loginLog:view', 'menu', '/loginLog/list', '2018-10-01 12:25:02',
   '2018-10-01 12:25:02');
INSERT INTO sys_permission
VALUES ('17', '1', '系统日志', '1', '0/1', 'log:view', 'menu', '/log/list', '2018-10-27 16:28:50', '2018-10-27 16:28:50');
INSERT INTO sys_permission VALUES
  ('18', '1', '图标管理', '1', '0/1', 'icon:view', 'menu', '/icon/icons', '2018-10-01 12:48:42', '2018-08-23 13:15:51');
INSERT INTO sys_permission
VALUES ('20', '1', '目录测试', '14', '0/14', 'mulutest', 'directory', NULL, '2018-11-17 12:47:06', '2018-11-17 12:47:06');
INSERT INTO sys_permission VALUES
  ('21', '1', '菜单测试', '20', '0/14/20', 'caidantest:view', 'menu', '/caidantest/list', '2018-11-17 14:32:57',
   '2018-11-17 12:49:07');
INSERT INTO sys_permission VALUES
  ('23', '1', '测试菜单', '20', '0/14/20', 'testcaidan:view', 'menu', '/testcaidan/listt', '2018-11-17 14:50:26',
   '2018-11-17 14:39:13');
INSERT INTO sys_permission VALUES
  ('24', '1', '测试按钮', '23', '0/14/20/23', 'testcaidan:add', 'button', NULL, '2018-11-17 15:05:12',
   '2018-11-17 15:05:12');
INSERT INTO sys_permission
VALUES ('25', '1', '代码生成', '1', '0/1', 'code:view', 'menu', '/code/list', '2018-12-25 15:53:54', '2018-12-25 15:53:54');

-- ----------------------------
-- Records of sys_permission
-- ----------------------------

INSERT INTO sys_permission
VALUES ('1', '1', '行政管理', '0', '0', 'system', 'top_directory', NULL, '2018-07-10 11:24:48', '2018-07-10 11:24:48');
INSERT INTO sys_permission
VALUES ('2', '1', '系统管理', '1', '1', 'system', 'top_directory', NULL, '2018-07-10 11:24:48', '2018-07-10 11:24:48');
INSERT INTO sys_permission
VALUES ('3', '1', '用户管理', '2', '0/1', 'user:view', 'menu', '/user/list', '2018-07-10 11:24:48', '2018-07-10 11:24:48');
INSERT INTO sys_permission
VALUES ('4', '1', '添加', '3', '0/1/2', 'user:add', 'button', '', '2018-07-10 11:25:40', '2018-07-10 11:25:40');
INSERT INTO sys_permission
VALUES ('5', '1', '删除', '3', '0/1/2', 'user:del', 'button', '', '2018-07-10 11:27:10', '2018-07-10 11:27:10');
INSERT INTO sys_permission
VALUES ('6', '1', '编辑', '3', '0/1/2', 'user:edit', 'button', '', '2018-11-17 14:54:52', '2018-07-10 11:27:36');
INSERT INTO sys_permission
VALUES ('7', '1', '角色管理', '2', '0/1', 'role:view', 'menu', '/role/list', '2018-08-04 09:38:44', '2018-08-04 09:38:44');
INSERT INTO sys_permission
VALUES ('8', '1', '添加', '7', '0/1/6', 'role:add', 'button', '', '2018-08-04 09:42:05', '2018-08-04 09:42:05');
INSERT INTO sys_permission
VALUES ('9', '1', '删除', '7', '0/1/6', 'role:del', 'button', '', '2018-11-17 15:01:41', '2018-08-04 09:43:26');
INSERT INTO sys_permission
VALUES ('10', '1', '编辑', '7', '0/1/6', 'role:edit', 'button', '', '2018-08-04 09:46:01', '2018-08-04 09:46:01');
INSERT INTO sys_permission VALUES
  ('11', '1', '权限管理', '2', '0/1', 'permission:view', 'menu', '/permission/list', '2018-08-04 09:48:57',
   '2018-08-04 09:48:57');
INSERT INTO sys_permission
VALUES ('12', '1', '添加', '11', '0/1/10', 'permission:add', 'button', '', '2018-08-04 09:50:50', '2018-08-04 09:50:50');
INSERT INTO sys_permission
VALUES ('13', '1', '删除', '11', '0/1/10', 'permission:del', 'button', '', '2018-08-04 09:50:50', '2018-08-04 09:50:50');
INSERT INTO sys_permission
VALUES ('14', '1', '编辑', '11', '0/1/10', 'permission:edit', 'button', '', '2018-08-23 11:33:34', '2018-08-23 11:33:34');
INSERT INTO sys_permission
VALUES ('15', '1', '测试管理', '1', '0', 'test', 'top_directory', NULL, '2018-10-01 14:15:32', '2018-07-10 11:24:48');
INSERT INTO sys_permission VALUES
  ('16', '1', '登录日志', '2', '0/1', 'loginLog:view', 'menu', '/loginLog/list', '2018-10-01 12:25:02',
   '2018-10-01 12:25:02');
INSERT INTO sys_permission
VALUES ('17', '1', '系统日志', '3', '0/1', 'log:view', 'menu', '/log/list', '2018-10-27 16:28:50', '2018-10-27 16:28:50');
INSERT INTO sys_permission VALUES
  ('18', '1', '图标管理', '2', '0/1', 'icon:view', 'menu', '/icon/icons', '2018-10-01 12:48:42', '2018-08-23 13:15:51');
INSERT INTO sys_permission
VALUES ('20', '1', '目录测试', '15', '0/14', 'mulutest', 'directory', NULL, '2018-11-17 12:47:06', '2018-11-17 12:47:06');
INSERT INTO sys_permission VALUES
  ('21', '1', '菜单测试', '21', '0/14/20', 'caidantest:view', 'menu', '/caidantest/list', '2018-11-17 14:32:57',
   '2018-11-17 12:49:07');
INSERT INTO sys_permission VALUES
  ('23', '1', '测试菜单', '21', '0/14/20', 'testcaidan:view', 'menu', '/testcaidan/listt', '2018-11-17 14:50:26',
   '2018-11-17 14:39:13');
INSERT INTO sys_permission VALUES
  ('24', '1', '测试按钮', '24', '0/14/20/23', 'testcaidan:add', 'button', NULL, '2018-11-17 15:05:12',
   '2018-11-17 15:05:12');
INSERT INTO sys_permission
VALUES ('25', '1', '代码生成', '2', '0/2', 'code:view', 'menu', '/code/list', '2018-12-25 15:53:54', '2018-12-25 15:53:54');
-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS sys_role;
CREATE TABLE sys_role (
  id             INT(10) NOT NULL AUTO_INCREMENT
  COMMENT '主键ID',
  permission_ids VARCHAR(255)     DEFAULT NULL
  COMMENT '权限ID列表',
  available      TINYINT(1)       DEFAULT NULL
  COMMENT '是否可用',
  role_name      VARCHAR(50)      DEFAULT NULL
  COMMENT '角色名称',
  role_code      VARCHAR(50)      DEFAULT NULL
  COMMENT '角色编号',
  update_time    DATETIME         DEFAULT CURRENT_TIMESTAMP
  COMMENT '修改时间',
  create_time    DATETIME         DEFAULT CURRENT_TIMESTAMP
  COMMENT '创建时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = utf8
  COMMENT ='系统角色';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO sys_role VALUES
  ('1', ',1,17,10,13,11,12,2,4,5,3,25,18,16,6,9,7,8,14,20,23,24,21,', '1', '超级管理员', 'admin', '2018-12-25 15:54:52',
   '2018-07-10 11:19:49');
INSERT INTO sys_role VALUES ('2', ',14,20,23,24,21,', '1', '测试员', 'test', '2018-12-20 15:30:53', '2018-07-10 11:19:49');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS sys_user;
CREATE TABLE sys_user (
  id          INT(10) NOT NULL AUTO_INCREMENT
  COMMENT '主键ID',
  role_id     INT(10)          DEFAULT NULL
  COMMENT '角色ID',
  name        VARCHAR(50)      DEFAULT NULL
  COMMENT '名称',
  user_name   VARCHAR(50)      DEFAULT NULL
  COMMENT '用户名',
  pass_word   VARCHAR(50)      DEFAULT NULL
  COMMENT '密码',
  salt        VARCHAR(50)      DEFAULT NULL
  COMMENT '盐值',
  state       TINYINT(1)       DEFAULT NULL
  COMMENT '状态(0：禁用，1：启用，2：锁定)',
  update_time DATETIME         DEFAULT CURRENT_TIMESTAMP
  COMMENT '修改时间',
  create_time DATETIME         DEFAULT CURRENT_TIMESTAMP
  COMMENT '创建时间',
  PRIMARY KEY (id),
  UNIQUE KEY user_name (user_name)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 10
  DEFAULT CHARSET = utf8
  COMMENT ='系统用户';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO sys_user VALUES
  ('1', '1', '超级管理员', 'admin', '90de4365c537fa959193d13ad8d07665', 'XZUY77Pq41M6jaGeR2q1yMaPOrmemy6A', '1',
   '2018-12-06 17:19:35', '2018-07-10 11:16:24');
INSERT INTO sys_user VALUES
  ('9', '2', 'test', 'test', 'f58cb4cbc689ace5456577d913c68bfd', 'tPKGoMIgl6y16wWaoaqXyRS2N3WzmsNo', '1',
   '2018-12-20 15:30:10', '2018-08-11 15:31:26');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS sys_department;
CREATE TABLE sys_department (
  id          INT(10)      NOT NULL       AUTO_INCREMENT
  COMMENT '主键ID',
  bmmc        VARCHAR(255) NOT NULL
  COMMENT '部门名称',
  isshow      TINYINT(1)   NOT NULL       DEFAULT 0
  COMMENT '是否显示',
  pid         INT(10)      NOT NULL
  COMMENT '上级ID',
  manager     INT(10)
  COMMENT '部门主管',
  update_time DATETIME                    DEFAULT CURRENT_TIMESTAMP
  COMMENT '修改时间',
  create_time DATETIME                    DEFAULT CURRENT_TIMESTAMP
  COMMENT '创建时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = utf8
  COMMENT ='部门';
-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS sys_code;
CREATE TABLE sys_code (
  id           INT(10)      NOT NULL       AUTO_INCREMENT
  COMMENT '主键ID',
  `code_name`  VARCHAR(100) NOT NULL
  COMMENT '代码名称',
  `code`       VARCHAR(10)  NOT NULL
  COMMENT '代码',
  `code_value` INT(2)       NOT NULL
  COMMENT '代码值',
  available    INT(1)       NOT NULL       DEFAULT 1
  COMMENT '是否可用',
  update_time  DATETIME                    DEFAULT CURRENT_TIMESTAMP
  COMMENT '修改时间',
  create_time  DATETIME                    DEFAULT CURRENT_TIMESTAMP
  COMMENT '创建时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = utf8
  COMMENT ='代码';

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS biz_project;
CREATE TABLE biz_project (
  id          INT(10)      NOT NULL       AUTO_INCREMENT
  COMMENT '主键ID',
  `name`      VARCHAR(255) NOT NULL
  COMMENT 'xian',
  number      VARCHAR(20)  NOT NULL       DEFAULT 0
  COMMENT '是否显示',
  lxsj        DATE         NOT NULL
  COMMENT '立项时间',
  department  INT(10)
  COMMENT '部门',
  `manager`   INT(10)      NOT NULL
  COMMENT '部门经理',
  `rjkfjd`    INT(10)      NOT NULL
  COMMENT '软件开发进度',
  `fawcqk`    TINYINT(1)   NOT NULL
  COMMENT '方案完成情况',
  `cpxxwcqk`  TINYINT(1)   NOT NULL
  COMMENT '产品选型完成情况',
  `zbzzwcqk`  TINYINT(1)   NOT NULL
  COMMENT '招标组织完成情况',
  `yzjhbqd`   TINYINT(1)   NOT NULL
  COMMENT '用资计划表确定',
  `htqd`      TINYINT(1)   NOT NULL
  COMMENT '合同签订',
  `yjcg`      TINYINT(1)   NOT NULL
  COMMENT '硬件采购',
  `sgqr`      TINYINT(1)   NOT NULL
  COMMENT '施工确认',
  `jcjd`      TINYINT(1)   NOT NULL
  COMMENT '集成进度',
  `htje`      DECIMAL
  COMMENT '合同金额',
  `hkqk`      VARCHAR(255)
  COMMENT '回款金额',
  `whje`      DECIMAL
  COMMENT '未回金额',
  `whsx`      DATE
  COMMENT '未回时限',
  `hktz`      VARCHAR(255)
  COMMENT '回款通知',
  `ml`        DECIMAL
  COMMENT '毛利',
  `zbj`       DECIMAL
  COMMENT '质保金',
  `zbjthqk`   VARCHAR(255)
  COMMENT '质保金退换情况',
  `xmjx`      TINYINT(1)
  COMMENT '项目结项',
  `lrr`       INT(10)      NOT NULL
  COMMENT '录入人',
  update_time DATETIME
  COMMENT '修改时间',
  create_time DATETIME
  COMMENT '创建时间',
  `byzd1`     VARCHAR(255)
  COMMENT '备用字段1',
  `byzd2`     VARCHAR(255)
  COMMENT '备用字段2',
  `byzd3`     VARCHAR(255)
  COMMENT '备用字段3',
  PRIMARY KEY (id)
)
  ENGINE = INNODB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = utf8
  COMMENT ='项目表';