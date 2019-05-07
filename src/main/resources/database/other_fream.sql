/*
SQLyog Ultimate v9.10 
MySQL - 5.1.73-community : Database - other_fream
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`other_fream` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `other_fream`;

/*Table structure for table `biz_project` */

DROP TABLE IF EXISTS `biz_project`;

CREATE TABLE `biz_project` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(255) NOT NULL COMMENT 'xian',
  `number` varchar(20) NOT NULL DEFAULT '0' COMMENT '是否显示',
  `lxsj` date NOT NULL COMMENT '立项时间',
  `department` int(10) NOT NULL COMMENT '部门',
  `manager` int(10) NOT NULL COMMENT '部门经理',
  `rjkfjd` int(10) NOT NULL COMMENT '软件开发进度',
  `fawcqk` tinyint(1) NOT NULL COMMENT '方案完成情况',
  `cpxxwcqk` tinyint(1) NOT NULL COMMENT '产品选型完成情况',
  `zbzzwcqk` tinyint(1) NOT NULL COMMENT '招标组织完成情况',
  `yzjhbqd` tinyint(1) NOT NULL COMMENT '用资计划表确定',
  `htqd` tinyint(1) NOT NULL COMMENT '合同签订',
  `yjcg` tinyint(1) NOT NULL COMMENT '硬件采购',
  `sgqr` tinyint(1) NOT NULL COMMENT '施工确认',
  `jcjd` tinyint(1) NOT NULL COMMENT '集成进度',
  `htje` decimal(10,0) DEFAULT NULL COMMENT '合同金额',
  `hkqk` varchar(255) DEFAULT NULL COMMENT '回款金额',
  `whje` decimal(10,0) DEFAULT NULL COMMENT '未回金额',
  `whsx` date DEFAULT NULL COMMENT '未回时限',
  `hktz` varchar(255) DEFAULT NULL COMMENT '回款通知',
  `ml` decimal(10,0) DEFAULT NULL COMMENT '毛利',
  `zbj` decimal(10,0) DEFAULT NULL COMMENT '质保金',
  `zbjthqk` varchar(255) DEFAULT NULL COMMENT '质保金退换情况',
  `xmjx` tinyint(1) DEFAULT NULL COMMENT '项目结项',
  `lrr` int(10) NOT NULL COMMENT '录入人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `byzd1` varchar(255) DEFAULT NULL COMMENT '备用字段1',
  `byzd2` varchar(255) DEFAULT NULL COMMENT '备用字段2',
  `byzd3` varchar(255) DEFAULT NULL COMMENT '备用字段3',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='项目表';

/*Data for the table `biz_project` */

insert  into `biz_project`(`id`,`name`,`number`,`lxsj`,`department`,`manager`,`rjkfjd`,`fawcqk`,`cpxxwcqk`,`zbzzwcqk`,`yzjhbqd`,`htqd`,`yjcg`,`sgqr`,`jcjd`,`htje`,`hkqk`,`whje`,`whsx`,`hktz`,`ml`,`zbj`,`zbjthqk`,`xmjx`,`lrr`,`update_time`,`create_time`,`byzd1`,`byzd2`,`byzd3`) values (3,'admin','123456','2019-03-15',0,0,0,1,1,1,1,1,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2019-03-15 13:47:07','2019-03-15 13:47:07',NULL,NULL,NULL),(4,'fuck shit god ','23456','2019-03-15',2,1,0,1,1,1,1,1,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2019-03-15 16:05:13','2019-03-15 16:05:13',NULL,NULL,NULL),(5,'你的大爷','123456','2019-03-15',6,1,0,1,1,1,1,1,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2019-03-15 16:38:05','2019-03-15 16:38:05',NULL,NULL,NULL);

/*Table structure for table `sys_department` */

DROP TABLE IF EXISTS `sys_department`;

CREATE TABLE `sys_department` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `bmmc` varchar(255) NOT NULL COMMENT '部门名称',
  `isshow` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否显示',
  `pid` int(10) NOT NULL COMMENT '上级ID',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `manager` int(10) DEFAULT NULL COMMENT '部门主管',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='部门';

/*Data for the table `sys_department` */

insert  into `sys_department`(`id`,`bmmc`,`isshow`,`pid`,`update_time`,`create_time`,`manager`) values (1,'兰州宜元中林科技有限公司',0,0,NULL,NULL,NULL),(2,'总经理',0,1,NULL,NULL,NULL),(3,'行政总裁',0,2,'2019-03-14 10:06:10','2019-03-14 09:52:30',NULL),(4,'财务总裁',0,2,'2019-03-14 11:24:08','2019-03-14 11:23:57',9),(5,'尚总',0,2,'2019-03-14 16:23:04','2019-03-14 16:23:04',NULL),(6,'西安研发部',0,5,'2019-03-14 16:24:01','2019-03-14 16:24:01',NULL),(7,'系统集成部',0,5,'2019-03-14 16:24:23','2019-03-14 16:24:23',NULL);

/*Table structure for table `sys_log` */

DROP TABLE IF EXISTS `sys_log`;

CREATE TABLE `sys_log` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名',
  `oper_method` varchar(250) DEFAULT NULL COMMENT '操作方法',
  `request_param` varchar(500) DEFAULT NULL COMMENT '操作参数',
  `oper_desc` varchar(255) DEFAULT NULL COMMENT '操作说明',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8 COMMENT='系统日志';

/*Data for the table `sys_log` */

insert  into `sys_log`(`id`,`user_id`,`user_name`,`oper_method`,`request_param`,`oper_desc`,`update_time`,`create_time`) values (44,1,'admin','com.xieke.admin.web.RoleController.save','{\"available\":1,\"permissionIds\":\",1,16,17,18,25,\",\"roleCode\":\"ptyg\",\"roleName\":\"普通员工\"}','保存角色操作','2019-03-12 16:56:20','2019-03-12 16:56:20'),(45,1,'admin','com.xieke.admin.web.UserController.add','{\"name\":\"中林科技\",\"passWord\":\"111111\",\"roleId\":3,\"state\":1,\"userName\":\"zlkj\"}','添加用户操作','2019-03-12 16:57:09','2019-03-12 16:57:09'),(46,1,'admin','com.xieke.admin.web.UserController.userEdit','{\"passWord\":\"111111\"}','本人修改用户操作','2019-03-13 10:39:45','2019-03-13 10:39:45'),(47,1,'admin','com.xieke.admin.web.PermissionController.save','{\"available\":0,\"id\":3,\"parentId\":2,\"permissionCode\":\"user:add\",\"permissionName\":\"添加\",\"resourceType\":\"button\",\"url\":\"\"}','保存权限操作','2019-03-13 10:52:00','2019-03-13 10:52:00'),(48,1,'admin','com.xieke.admin.web.PermissionController.save','{\"available\":1,\"id\":3,\"parentId\":2,\"permissionCode\":\"user:add\",\"permissionName\":\"添加\",\"resourceType\":\"button\",\"url\":\"\"}','保存权限操作','2019-03-13 10:53:05','2019-03-13 10:53:05'),(49,1,'admin','com.xieke.admin.web.UserController.edit','{}','修改用户操作','2019-03-13 17:31:56','2019-03-13 17:31:56'),(50,1,'admin','com.xieke.admin.web.UserController.edit','{}','修改用户操作','2019-03-14 09:33:33','2019-03-14 09:33:33'),(51,1,'admin','com.xieke.admin.web.UserController.edit','{}','修改用户操作','2019-03-14 09:45:57','2019-03-14 09:45:57'),(52,1,'admin','com.xieke.admin.web.DeptController.add','{\"bmmc\":\"行政总裁\",\"pid\":\"1\"}','添加部门操作','2019-03-14 09:52:30','2019-03-14 09:52:30'),(53,1,'admin','com.xieke.admin.web.DeptController.edit','{\"bmmc\":\"行政总裁\",\"id\":3,\"pid\":\"1\"}','修改部门操作','2019-03-14 10:05:56','2019-03-14 10:05:56'),(54,1,'admin','com.xieke.admin.web.DeptController.add','{\"bmmc\":\"财务总裁\",\"manager\":10,\"pid\":1}','添加部门操作','2019-03-14 11:23:57','2019-03-14 11:23:57'),(55,1,'admin','com.xieke.admin.web.DeptController.edit','{\"bmmc\":\"财务总裁\",\"id\":4,\"manager\":9,\"pid\":1}','修改部门操作','2019-03-14 11:24:05','2019-03-14 11:24:05'),(56,1,'admin','com.xieke.admin.web.DeptController.add','{\"bmmc\":\"尚总\"}','添加部门操作','2019-03-14 16:18:34','2019-03-14 16:18:34'),(57,1,'admin','com.xieke.admin.web.DeptController.add','{\"bmmc\":\"尚总\"}','添加部门操作','2019-03-14 16:19:58','2019-03-14 16:19:58'),(58,1,'admin','com.xieke.admin.web.DeptController.add','{\"bmmc\":\"尚总\"}','添加部门操作','2019-03-14 16:20:22','2019-03-14 16:20:22'),(59,1,'admin','com.xieke.admin.web.DeptController.add','{\"bmmc\":\"尚总\",\"pid\":2}','添加部门操作','2019-03-14 16:23:04','2019-03-14 16:23:04'),(60,1,'admin','com.xieke.admin.web.DeptController.add','{\"bmmc\":\"西安研发部\",\"pid\":5}','添加部门操作','2019-03-14 16:24:01','2019-03-14 16:24:01'),(61,1,'admin','com.xieke.admin.web.DeptController.add','{\"bmmc\":\"系统集成部\",\"pid\":5}','添加部门操作','2019-03-14 16:24:23','2019-03-14 16:24:23');

/*Table structure for table `sys_login_log` */

DROP TABLE IF EXISTS `sys_login_log`;

CREATE TABLE `sys_login_log` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名',
  `ip_address` varchar(50) DEFAULT NULL COMMENT 'IP地址',
  `geography_location` varchar(50) DEFAULT NULL COMMENT '地理位置',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8 COMMENT='登录日志';

/*Data for the table `sys_login_log` */

insert  into `sys_login_log`(`id`,`user_id`,`user_name`,`ip_address`,`geography_location`,`update_time`,`create_time`) values (71,1,'admin','0:0:0:0:0:0:0:1','xxxx','2019-03-12 16:20:11','2019-03-12 16:20:11'),(72,1,'admin','0:0:0:0:0:0:0:1','xxxx','2019-03-12 16:52:53','2019-03-12 16:52:53'),(73,9,'test','0:0:0:0:0:0:0:1','xxxx','2019-03-12 16:53:34','2019-03-12 16:53:34'),(74,1,'admin','0:0:0:0:0:0:0:1','xxxx','2019-03-12 16:54:01','2019-03-12 16:54:01'),(75,10,'zlkj','0:0:0:0:0:0:0:1','xxxx','2019-03-12 16:57:47','2019-03-12 16:57:47'),(76,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 10:02:50','2019-03-13 10:02:50'),(77,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 10:06:52','2019-03-13 10:06:52'),(78,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 10:15:03','2019-03-13 10:15:03'),(79,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 10:30:37','2019-03-13 10:30:37'),(80,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 10:39:31','2019-03-13 10:39:31'),(81,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 10:45:33','2019-03-13 10:45:33'),(82,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 10:48:41','2019-03-13 10:48:41'),(83,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 10:52:32','2019-03-13 10:52:32'),(84,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 10:54:55','2019-03-13 10:54:55'),(85,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 10:59:38','2019-03-13 10:59:38'),(86,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 11:00:36','2019-03-13 11:00:36'),(87,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 11:01:21','2019-03-13 11:01:21'),(88,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 11:03:55','2019-03-13 11:03:55'),(89,1,'admin','127.0.0.1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 11:04:48','2019-03-13 11:04:48'),(90,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 11:08:26','2019-03-13 11:08:26'),(91,1,'admin','127.0.0.1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 11:10:45','2019-03-13 11:10:45'),(92,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 11:14:31','2019-03-13 11:14:31'),(93,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 11:17:25','2019-03-13 11:17:25'),(94,1,'admin','127.0.0.1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 11:20:47','2019-03-13 11:20:47'),(95,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 11:25:19','2019-03-13 11:25:19'),(96,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 11:30:17','2019-03-13 11:30:17'),(97,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 11:32:03','2019-03-13 11:32:03'),(98,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 12:21:34','2019-03-13 12:21:34'),(99,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 13:49:12','2019-03-13 13:49:12'),(100,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 14:24:12','2019-03-13 14:24:12'),(101,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 14:24:24','2019-03-13 14:24:24'),(102,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 14:25:43','2019-03-13 14:25:43'),(103,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 14:26:27','2019-03-13 14:26:27'),(104,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 14:29:01','2019-03-13 14:29:01'),(105,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 14:56:46','2019-03-13 14:56:46'),(106,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 15:29:24','2019-03-13 15:29:24'),(107,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 16:02:58','2019-03-13 16:02:58'),(108,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 16:39:02','2019-03-13 16:39:02'),(109,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 16:58:32','2019-03-13 16:58:32'),(110,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-13 17:16:03','2019-03-13 17:16:03'),(111,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 09:32:57','2019-03-14 09:32:57'),(112,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 10:05:44','2019-03-14 10:05:44'),(113,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 10:23:26','2019-03-14 10:23:26'),(114,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 11:23:35','2019-03-14 11:23:35'),(115,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 14:00:27','2019-03-14 14:00:27'),(116,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 14:45:36','2019-03-14 14:45:36'),(117,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 14:45:36','2019-03-14 14:45:36'),(118,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 14:45:37','2019-03-14 14:45:37'),(119,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 15:25:15','2019-03-14 15:25:15'),(120,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 16:08:12','2019-03-14 16:08:12'),(121,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 16:08:12','2019-03-14 16:08:12'),(122,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 16:38:38','2019-03-14 16:38:38'),(123,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-14 17:29:48','2019-03-14 17:29:48'),(124,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-15 09:19:42','2019-03-15 09:19:42'),(125,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-15 14:07:39','2019-03-15 14:07:39'),(126,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-15 14:38:23','2019-03-15 14:38:23'),(127,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-15 15:10:25','2019-03-15 15:10:25'),(128,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-15 15:59:33','2019-03-15 15:59:33'),(129,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-15 15:59:33','2019-03-15 15:59:33'),(130,1,'admin','0:0:0:0:0:0:0:1','西安市雁塔区科技三路融城云谷C座1105','2019-03-15 16:29:44','2019-03-15 16:29:44');

/*Table structure for table `sys_permission` */

DROP TABLE IF EXISTS `sys_permission`;

CREATE TABLE `sys_permission` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `available` tinyint(1) DEFAULT NULL COMMENT '是否可用',
  `permission_name` varchar(50) DEFAULT NULL COMMENT '权限名称',
  `parent_id` int(10) DEFAULT NULL COMMENT '父权限ID',
  `parent_ids` varchar(255) DEFAULT NULL COMMENT '父权限ID列表',
  `permission_code` varchar(50) DEFAULT NULL COMMENT '权限编码',
  `resource_type` varchar(50) DEFAULT NULL COMMENT '资源类型(top_directory/directory/menu/button)',
  `url` varchar(50) DEFAULT NULL COMMENT '资源路径',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8 COMMENT='系统权限';

/*Data for the table `sys_permission` */

insert  into `sys_permission`(`id`,`available`,`permission_name`,`parent_id`,`parent_ids`,`permission_code`,`resource_type`,`url`,`update_time`,`create_time`) values (1,1,'行政管理',0,'0','manager','top_directory',NULL,'2018-07-10 11:24:48','2018-07-10 11:24:48'),(2,1,'系统管理',1,'0/1','system','directory',NULL,'2018-07-10 11:24:48','2018-07-10 11:24:48'),(3,1,'用户管理',2,'0/1/2','user:view','menu','/user/list','2018-07-10 11:24:48','2018-07-10 11:24:48'),(4,1,'添加',3,'0/1/2/3','user:add','button','','2018-07-10 11:25:40','2018-07-10 11:25:40'),(5,1,'删除',3,'0/1/2/3','user:del','button','','2018-07-10 11:27:10','2018-07-10 11:27:10'),(6,1,'编辑',3,'0/1/2/3','user:edit','button','','2018-11-17 14:54:52','2018-07-10 11:27:36'),(7,1,'角色管理',2,'0/1/2','role:view','menu','/role/list','2018-08-04 09:38:44','2018-08-04 09:38:44'),(8,1,'添加',7,'0/1/2/7','role:add','button','','2018-08-04 09:42:05','2018-08-04 09:42:05'),(9,1,'删除',7,'0/1/2/7','role:del','button','','2018-11-17 15:01:41','2018-08-04 09:43:26'),(10,1,'编辑',7,'0/1/2/7','role:edit','button','','2018-08-04 09:46:01','2018-08-04 09:46:01'),(11,1,'权限管理',2,'0/1/2','permission:view','menu','/permission/list','2018-08-04 09:48:57','2018-08-04 09:48:57'),(12,1,'添加',11,'0/1/11','permission:add','button','','2018-08-04 09:50:50','2018-08-04 09:50:50'),(13,1,'删除',11,'0/1/11','permission:del','button','','2018-08-04 09:50:50','2018-08-04 09:50:50'),(14,1,'编辑',11,'0/1/11','permission:edit','button','','2018-08-23 11:33:34','2018-08-23 11:33:34'),(15,1,'测试管理',0,'0','test','top_directory',NULL,'2018-10-01 14:15:32','2018-07-10 11:24:48'),(16,1,'登录日志',2,'0/1/2','loginLog:view','menu','/loginLog/list','2018-10-01 12:25:02','2018-10-01 12:25:02'),(17,1,'系统日志',2,'0/1/2','log:view','menu','/log/list','2018-10-27 16:28:50','2018-10-27 16:28:50'),(18,1,'项目管理',1,'0/1','project','menu','/project/list','2018-07-10 11:24:48','2018-07-10 11:24:48'),(20,1,'目录测试',15,'0/15','mulutest','directory',NULL,'2018-11-17 12:47:06','2018-11-17 12:47:06'),(21,1,'菜单测试',20,'0/15/20','caidantest:view','menu','/caidantest/list','2018-11-17 14:32:57','2018-11-17 12:49:07'),(23,1,'测试菜单',20,'0/15/20','testcaidan:view','menu','/testcaidan/listt','2018-11-17 14:50:26','2018-11-17 14:39:13'),(24,1,'测试按钮',24,'0/14/20/23','testcaidan:add','button',NULL,'2018-11-17 15:05:12','2018-11-17 15:05:12'),(25,1,'代码生成',2,'0/2','code:view','menu','/code/list','2018-12-25 15:53:54','2018-12-25 15:53:54'),(26,1,'部门管理',2,'0/1/2','dept:view','menu','/dept/list','2018-07-10 11:24:48','2018-07-10 11:24:48'),(27,1,'添加',26,'0/1/2/26','dept:add','button','','2018-07-10 11:25:40','2018-07-10 11:25:40'),(28,1,'删除',26,'0/1/2/26','dept:del','button','','2018-07-10 11:25:40','2018-07-10 11:25:40'),(29,1,'编辑',26,'0/1/2/26','dept:edit','button','','2018-07-10 11:25:40','2018-07-10 11:25:40'),(90,1,'图标管理',2,'0/1','icon:view','menu','/icon/icons','2018-10-01 12:48:42','2018-08-23 13:15:51');

/*Table structure for table `sys_role` */

DROP TABLE IF EXISTS `sys_role`;

CREATE TABLE `sys_role` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `permission_ids` varchar(255) DEFAULT NULL COMMENT '权限ID列表',
  `available` tinyint(1) DEFAULT NULL COMMENT '是否可用',
  `role_name` varchar(50) DEFAULT NULL COMMENT '角色名称',
  `role_code` varchar(50) DEFAULT NULL COMMENT '角色编号',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='系统角色';

/*Data for the table `sys_role` */

insert  into `sys_role`(`id`,`permission_ids`,`available`,`role_name`,`role_code`,`update_time`,`create_time`) values (1,',0,1,17,10,13,11,12,2,4,5,3,25,18,16,6,9,7,8,14,20,23,24,21,15,90,26,27,28,29,',1,'超级管理员','admin','2018-12-25 15:54:52','2018-07-10 11:19:49'),(2,',14,20,23,24,21,',1,'测试员','test','2018-12-20 15:30:53','2018-07-10 11:19:49'),(3,',1,16,17,18,25,',1,'普通员工','ptyg','2019-03-12 16:56:20','2019-03-12 16:56:20');

/*Table structure for table `sys_user` */

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `role_id` int(10) DEFAULT NULL COMMENT '角色ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `user_name` varchar(50) NOT NULL COMMENT '用户名',
  `pass_word` varchar(50) NOT NULL COMMENT '密码',
  `salt` varchar(50) DEFAULT NULL COMMENT '盐值',
  `state` tinyint(1) DEFAULT NULL COMMENT '状态(0：禁用，1：启用，2：锁定)',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `glbm` int(12) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='系统用户';

/*Data for the table `sys_user` */

insert  into `sys_user`(`id`,`role_id`,`name`,`user_name`,`pass_word`,`salt`,`state`,`update_time`,`create_time`,`glbm`) values (1,1,'超级管理员','admin','2d457205b5d23a88521f22ace2ce62cb','6kpgYJCYI5tZ7ML29KskVmIl0XFA0qms',1,'2019-03-13 10:39:45','2018-07-10 11:16:24',1),(9,2,'test','test','f58cb4cbc689ace5456577d913c68bfd','tPKGoMIgl6y16wWaoaqXyRS2N3WzmsNo',1,'2018-12-20 15:30:10','2018-08-11 15:31:26',2),(10,3,'中林科技','zlkj','29b1fd6b644d6dd9b6560ce5efa2c756','kJtnS72jDRZGJkULbQj7OwohnjolLE56',1,'2019-03-12 16:57:09','2019-03-12 16:57:09',3);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
