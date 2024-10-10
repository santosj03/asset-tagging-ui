import {
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';

export function AssetGroupTab({alert, posts}) 
{
  const navigate = useNavigate();
  const navigateToConfirmed = (post) => navigate(`/dashboard/asset-tag/details`, { state: post});

  return (
    <table className="mt-4 w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {["product code", "item name", "category", "brand", "uom", "total asset", "status", "action"].map((el) => (
          <th
            key={el}
            className="border-b border-blue-gray-50 py-3 px-5 text-left"
          >
            <Typography
            variant="small"
            className="text-[11px] font-bold uppercase text-blue-gray-400"
            >
            {el}
            </Typography>
          </th>
          ))}
        </tr>
      </thead>
      <tbody>
      { alert ? <></> : posts.map(
          (post, key) => {
            const className = `py-3 px-5 ${
              key === posts.length - 1
                ? ""
                : "border-b border-blue-gray-50"
            }`;

            return (
              <tr key={post.id} onClick={() => navigateToConfirmed(post)}>
                <td className={className}>
                  <div className="flex items-center gap-4">
                    <div>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {post.product_code}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className={className}>
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {post.item_name}
                  </Typography>
                </td>
                <td className={className}>
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {post.category.name}
                  </Typography>
                </td>
                <td className={className}>
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {post.brand.name}
                  </Typography>
                </td>
                <td className={className}>
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {post.uom.name}
                  </Typography>
                </td>
                <td className={className}>
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {post.assets.length}
                  </Typography>
                </td>
                <td className={className}>
                  <Chip
                    variant="gradient"
                    color={true ? "green" : "blue-gray"}
                    value={true ? "Active" : "InActive"}
                    className="py-0.5 px-2 text-[11px] font-medium w-fit"
                  />
                </td>
                <td className={className}>
                  <Tooltip content="Edit">
                    <IconButton variant="text">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}

export default AssetGroupTab