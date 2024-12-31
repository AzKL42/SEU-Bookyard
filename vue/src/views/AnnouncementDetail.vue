<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 公告详情页面，未实现，现有打算将其作为弹窗形式而非页面形式
-->

<template>
    <!-- 页头 -->
    <el-page-header @back="goBack" title="返回">

    </el-page-header>

    <el-divider></el-divider>

    <!-- 公告详情 -->
    <div class="announcement-detail">
      <el-card class="announcement-content">
        <h2>{{ announcement.title }}</h2>
        <p class="announcement-date">{{ announcement.date }}</p>
        <p>{{ announcement.content }}</p>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    name: "AnnouncementDetail",
    data() {
      return {
        announcement: null, // 当前公告详情
      };
    },
    methods: {
      goBack() {
        this.$router.push("/announcement");
      },
    },
    mounted() {
      const announcementId = this.$route.params.id;
      const allAnnouncements = [
        {
          id: 1,
          title: "系统维护通知",
          date: "2024-11-01",
          summary: "系统将于本周末进行维护，期间可能无法正常使用。",
          content: "详细内容：系统维护将从2024年11月1日晚10点持续到11月2日早6点...",
        },
        {
          id: 2,
          title: "图书馆新书推荐",
          date: "2024-10-25",
          summary: "本周图书馆新增100本热门书籍，欢迎借阅。",
          content: "详细内容：新增书籍包括小说、科技、历史等分类...",
        },
        // 更多公告...
      ];
      this.announcement = allAnnouncements.find((a) => a.id === parseInt(announcementId));
    },
  };
  </script>
  
  <style scoped>
  .announcement-detail {
    padding: 20px;
  }
  
  .announcement-content {
    margin-bottom: 20px;
  }
  
  .announcement-date {
    color: #666;
    font-size: 14px;
  }
  </style>
  