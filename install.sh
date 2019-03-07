# 以sudo权限执行本文件
# target_dir表示钉钉安装位置，target_dir必须是绝对路径
target_dir=/opt/dingding


if [ ! -d $target_dir ];then
  mkdir $target_dir
  echo "钉钉将会安装到：$target_dir" 
else
  echo "文件夹$target_dir已经存在"
fi
echo "复制图标和可执行程序"
app_name="dingding 1.0.0.AppImage"
app_image="./dist/$app_name"
if [ ! -f "$app_image" ] ; then
  app_image="./$app_name"
fi
cp ./dingding.ico "$app_image" "$target_dir"
exec_path="$target_dir/$app_name"
icon_path=$target_dir/dingding.ico 
echo "[Desktop Entry]
Name=钉钉
Comment=企业即时通讯工具
Exec=\"$exec_path\" %U
Terminal=false
Type=Application
Icon=$icon_path
StartupWMClass=dingding
X-AppImage-Version=1.0.0
Categories=Utility;
X-AppImage-BuildId=1I5H1A66nkZKP14uSR0pUo9hb5f
X-Desktop-File-Install-Version=0.22
">dingding.desktop
chmod +x dingding.desktop
cp dingding.desktop /usr/share/applications/
echo "按下win键，搜索钉钉，便可运行"