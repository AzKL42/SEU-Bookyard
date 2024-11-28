<template>
    <el-descriptions 
        title="个人信息"
        direction="vertical"
        border
        style="margin-top: 20px"
    >
      <el-descriptions-item
        :rowspan="2"
        :width="140"
        label="Photo"
        align="center"
      >
        <el-image
          style="width: 100px; height: 100px"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </el-descriptions-item>
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="电话">18100000000</el-descriptions-item>
      <el-descriptions-item label="位置">Suzhou</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="地址">
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
</template>