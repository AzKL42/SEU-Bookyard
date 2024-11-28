<template>
    <el-card style="max-width: 640px; max-height: 480px;" class="announcement-container" shadow="always">
        <template #header>
            <div class="card-header">
                <span>通知公告</span>
            </div>
        </template>
        <el-timeline>
            <el-timeline-item
                v-for="announcement in announcements"
                :key="announcement.date"
                :timestamp="announcement.date"
            >
                {{ announcement.content }}
            </el-timeline-item>
        </el-timeline>
    </el-card>
  </template>
  
  <script>
  export default {
    name: "Announcement",
    data() {
      return {
        announcements: [
          { date: "2024-09-29", content: "关于2024年国庆节期间开放时间的通知 " },
          { date: "2024-10-10", content: "图书馆将提早在下午5点闭馆" },
          { date: "2024-10-30", content: "新书已经上架!" },
          { date: "2024-11-15", content: "欢喜迎国庆，书香溢金秋——2024国庆系列活动指南" },
          { date: "2024-11-26", content: "关于报送2024年图书资料专业中初级专业技术资格评审材料的通知 " },
          { date: "2024-12-15", content: "图书馆将于12月15日开放" },
        ],
      };
    },
  };
  </script>
  
<style scoped>
.announcement-container {
  margin-top: 20px;
  /* background: #e2e2e2; */
}

</style>
  